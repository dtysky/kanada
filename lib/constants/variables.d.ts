/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: constants variables.
 */
/**
 * Collection of color spaces.
 */
export declare enum EColorSpaces {
    'RGB' = "RGB",
    'BGR' = "BGR",
    'RGBA' = "RGBA",
    'BGRA' = "BGRA",
    'L' = "L",
    'B' = "B",
    'CMYK' = "CMYK",
    'HSL' = "HSL",
    'HSV' = "HSV",
}
/**
 * Collection of color spaces (Array).
 */
export declare const COLOR_SPACES: string[];
/**
 * Bytes per pixel in different color spaces.
 */
export declare const PIXEL_SIZE: {
    RGB: number;
    RGBA: number;
    BGR: number;
    BGRA: number;
    L: number;
    B: number;
    CMYK: number;
    HSL: number;
    HSV: number;
};
/**
 * The max number for each channel in different color spaces.
 */
export declare const COLOR_MAX: {
    RGB: number[];
    RGBA: number[];
    BGR: number[];
    BGRA: number[];
    L: number[];
    B: number[];
    CMYK: number[];
    HSL: number[];
    HSV: number[];
};
/**
 * Color Transformations.
 */
export declare enum EColorTrans {
    'Linear' = 0,
    'Log' = 1,
    'Gamma' = 2,
}
/**
 * Modes of clip transformation.
 */
export declare enum EClipModes {
    'ARC' = 0,
    'ELLIPSE' = 1,
    'RECT' = 2,
}
/**
 * Collection of clip transformations (Array).
 */
export declare const CLIP_MODES: string[];
