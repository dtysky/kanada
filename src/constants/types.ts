/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: types definitions.
 */

/**
 * Type of color spaces.
 */
export type TColorSpaces =
    'RGBA'
    | 'RGB'
    | 'BGR'
    | 'BGRA'
    | 'L'
    | 'B'
    | 'CMYK'
    | 'HLS'
    | 'HSV'
    | 'XYZ';

/**
 * Type of image's size.
 */
export type TImageSize = {
    width: number,
    height: number
};

/**
 * Type of coords, it will be [x, y]
 */
export type TCoords = [number, number];

/**
 * Type of pixel, it will be [r, g, b, a] etc
 */
export type TPixel = Uint8ClampedArray | number[];

/**
 * Type of point, it will be [[x, y], pixel]
 */
export type TPoint = [TCoords, TPixel];
