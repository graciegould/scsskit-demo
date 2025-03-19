import type { PluginOption } from 'vite';

export type WatchScssConfigPlugin = PluginOption & {
    configureServer: (server: any) => Promise<void>;
}

export type TransformCodePlugin = PluginOption & {
    transform: (code: string, id: string) => { code: string; map: null };
}

export type Options = {} | undefined | null | void;

