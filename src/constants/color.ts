/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: constants for color.
 */

export enum EColorSpaces {
    'RGB',
    'BGR',
    'RGBA',
    'BGRA',
    'L',
    'B',
    'CMYK',
    'HLS',
    'HSV',
    'XYZ'
}

export const PIXEL_SIZE = {
    RGB: 3,
    RGBA: 4,
    BGR: 3,
    BGRA: 4,
    L: 1,
    B: 1,
    CMYK: 3,
    HLS: 3,
    HSV: 3,
    XYZ: 3
};
