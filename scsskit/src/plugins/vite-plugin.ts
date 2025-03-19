import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { ScsskitConfig } from '../types/config';
import type { Options, WatchScssConfigPlugin, TransformCodePlugin } from '../types/plugin-types';
import _ from 'lodash';
import Utils from '../utils/utils.js';
import { PluginOption, HmrContext } from 'vite';
import { DEFAULT_SCSSKIT_CONFIG } from '../constants.js';
const require = createRequire(import.meta.url);

let scsskitConfig: ScsskitConfig = DEFAULT_SCSSKIT_CONFIG;

const getOrCreateConfigFile = async (): Promise<string> => {
    const rootPath = path.resolve();
    const configFileNames = ['scsskit.config.js', 'scsskit.config.ts'];
    const files = await fs.promises.readdir(rootPath);
    let configFile = configFileNames.find(name => files.includes(name));

    if (configFile) {
        console.log(`Config file ${configFile} already exists.`);
        return path.join(rootPath, configFile);
    } else {
        const newConfigFileName = 'scsskit.config.js';
        const configFilePath = path.join(rootPath, newConfigFileName);
        await fs.promises.writeFile(configFilePath, `export default {};`);
        return configFilePath;
    }
};

const loadConfig = async (configFile: string): Promise<string | null> => {
    console.log("Loading scsskit configuration...");
    try {
        const configPath = path.resolve(configFile) + `?t=${Date.now()}`;
        const module = await import(configPath);
        console.log("scsskit configuration loaded.", module.default);
        return module.default;
    } catch (error) {
        console.error("Failed to load config:", error);
        return null;
    }
};

const transformJsImports = (code: string): string => {
    const scsskitImportRegex = /import\s+(\w+)\s+from\s+['"]scsskit['"]|const\s+(\w+)\s*=\s*require\(['"]scsskit['"]\)|let\s+(\w+)\s*=\s*require\(['"]scsskit['"]\)|import\s+\*\s+as\s+(\w+)\s+from\s+['"]scsskit['"]/;
    const match = code.match(scsskitImportRegex);
    if (match) {
        const scsskitVarName = match[1] || match[2] || match[3] || match[4];
        if (scsskitVarName) {
            return code.replace(
                scsskitImportRegex,
                `$&\n${scsskitVarName}.configure(${JSON.stringify(scsskitConfig, null, 2)});`
            );
        }
    }
    return code;
}

const transformScssImports = (code: string): string => {
    const scsskitImportRegex = /@use\s+['"]scsskit\/scss['"]\s+as\s+(\w+);/;
    const match = code.match(scsskitImportRegex);
    if (match) {
        const scsskitVarName = match[1].replace(/;/g, '');
        if (scsskitVarName) {
            const config = scsskitConfig;
            delete config.configFilePath;
            let css = Utils.jsToScssMap(config);
            if (css) {
                css = css.replace(/;/g, '');
            }
            return code.replace(
                scsskitImportRegex,
                `@use 'scsskit/scss' as ${scsskitVarName} with (
                    $config:(${css})
                );`
            );
        }
    }
    return code;
}

const scsskitVitePlugin: (_options?: Options) => PluginOption[] = (_options) => {
    return [
        {
            name: "watch-scsskit-config",
            enforce: "pre",
            apply: "serve",
            description: "Watch scsskit configuration file for changes",
            configureServer: async (server: any): Promise<void> => {
                try {
                    console.log("🛠 Running configureServer...");
                    let configFile: string = await getOrCreateConfigFile();
                    console.log(`✅ Config file path resolved: ${configFile}`);

                    if (configFile.endsWith('.ts')) {
                        console.error("❌ ERROR: .ts config files are not supported.");
                        throw new Error("Please use a .js extension for your scsskit configuration file. This will be fixed soon!");
                    }

                    let config = await loadConfig(configFile);
                    scsskitConfig.configFilePath = configFile;
                    scsskitConfig = _.merge(scsskitConfig, config);
                    console.log("✅ Config loaded:", config);

                    chokidar.watch(configFile).on('change', async () => {
                        try {
                            console.log(`🔄 Config file changed: ${scsskitConfig.configFilePath}`);
                            if (_.isString(scsskitConfig.configFilePath)) {
                                delete require.cache[require.resolve(scsskitConfig.configFilePath)];
                                console.log("🧹 Cleared config cache.");
                                config = await loadConfig(scsskitConfig.configFilePath);
                            }
                        } catch (error) {
                            console.error("❌ Error reloading config:", error);
                        }
                    });

                } catch (err) {
                    console.error("❌ ERROR in configureServer:", err);
                }
            },
            handleHotUpdate: async (ctx: HmrContext) => {
                const { file, server } = ctx;
                const rootPath = path.resolve();
                if (
                    file.startsWith(rootPath) &&
                    (
                        file.endsWith('scsskit.config.js') ||
                        file.endsWith('scsskit.config.ts')
                    ) &&
                    scsskitConfig.configFilePath == file
                ) {
                    console.error("🚫 Ignoring duplicate config file:", file);
                    return;
                } else if (file.endsWith('scsskit.config.js') || file.endsWith('scsskit.config.ts')) {
                    console.log(`Hot update for ${scsskitConfig.configFilePath}`);
                    scsskitConfig = _.merge(scsskitConfig, await loadConfig(file));
                    server.ws.send({ type: 'full-reload' });
                }
            }
        } as WatchScssConfigPlugin,
        {
            name: "csss-transformer",
            enforce: "pre",
            transform: (code: string, id: string,) => {
                if (
                    (
                        id.endsWith('.js') ||
                        id.endsWith('.tsx') ||
                        id.endsWith('.jsx') ||
                        id.endsWith('.ts')
                    )
                ) {
                    return {
                        code: transformJsImports(code),
                        map: null,
                    };
                }
                if (id.endsWith('.scss')) {
                    if (code.includes("@use 'scsskit/scss' as") || code.includes("@use 'scsskit/scss' as *;")) {
                        code = transformScssImports(code);
                        return {
                            code: transformScssImports(code),
                            map: null,
                        };
                    }
                }
                return null;
            }
        } as TransformCodePlugin
    ]
};

export default scsskitVitePlugin;