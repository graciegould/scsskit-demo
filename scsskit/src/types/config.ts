import  { BreakpointsType }  from "./breakpoints";

interface ScsskitConfig {
    breakpoints?: BreakpointsType;
    configFilePath?: string | null;
    colors?: object;
}

export type { ScsskitConfig };