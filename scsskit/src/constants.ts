import { ScsskitConfig } from "./types";
const DEFAULT_SCSSKIT_CONFIG : ScsskitConfig = {
    configFilePath: null,
    breakpoints: {
        sm: { minWidth: 640, maxWidth: 767 },
        md: { minWidth: 768, maxWidth: 1023 },
        lg: { minWidth: 1024, maxWidth: 1279 },
        xl: { minWidth: 1280, maxWidth: 1535 },
        xxl: { minWidth: 1536, maxWidth: 1791 },
        xxxl: { minWidth: 1792, maxWidth: 2047 },
    }
}

export { DEFAULT_SCSSKIT_CONFIG };