/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: types definitions.
 */

export type TColorSpaces =
    'RGBA'
        | 'RGB'
        | 'L'
        | 'B'
        | 'CMYK'
        | 'HLS'
        | 'HSV'
        | 'XYZ';

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
