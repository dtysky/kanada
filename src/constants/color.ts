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
    'HSL',
    'HSV'
}

export const PIXEL_SIZE = {
    RGB: 3,
    RGBA: 4,
    BGR: 3,
    BGRA: 4,
    L: 1,
    B: 1,
    CMYK: 4,
    HSL: 3,
    HSV: 3
};

export const COLOR_MAX = {
    RGB: [255, 255, 255],
    RGBA: [255, 255, 255, 255],
    BGR: [255, 255, 255],
    BGRA: [255, 255, 255, 255],
    L: [255],
    B: [255],
    // normalize the range from 0 ~ 1 -> 0 ~ 255
    CMYK: [255, 255, 255, 255],
    // normalize the hue from 0 ~ 360 -> 0 ~ 255
    HSL: [240, 255, 255],
    HSV: [240, 255, 255]
};
