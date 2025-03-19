
import { BreakpointsType } from './types/breakpoints';
import { ScsskitConfig } from './types/config';
import { DEFAULT_SCSSKIT_CONFIG } from './constants.js';
class Scsskit {
    configFilePath: string | null;
    breakpoints: BreakpointsType;
    colors: object | null;
    constructor() {
        this.configFilePath = null;
        this.breakpoints = DEFAULT_SCSSKIT_CONFIG.breakpoints;
        this.colors = null;
    }

    configure (config: ScsskitConfig) {
        this.breakpoints = config?.breakpoints ?? {};
        this.colors = config?.colors ?? null;
    }
}

const scsskit = new Scsskit();
export default scsskit;