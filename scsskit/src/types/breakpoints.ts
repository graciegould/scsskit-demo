
export type OrientationValue = "portrait" | "landscape";

export type BreakpointType = {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    orientation?: OrientationValue;
};

export type BreakpointsType = {
    [key: string]: BreakpointType;
} | null | undefined;

