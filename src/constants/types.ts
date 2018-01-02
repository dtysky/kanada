/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: types definitions.
 */

/**
 * Type of color spaces.
 */
export type TColorSpace =
    'RGBA'
    | 'RGB'
    | 'BGR'
    | 'BGRA'
    | 'L'
    | 'B'
    | 'CMYK'
    | 'HSL'
    | 'HSV';

/**
 * Type of nonlinear transformation.
 */
export type TColorTrans =
    'Linear'
    | 'Log'
    | 'Gamma';

/**
 * Type of size, it should be integer.
 */
export type TSize = number;

/**
 * Type of image's size, it should be [width, height].
 */
export type TImageSize = [TSize, TSize];

/**
 * Type of color channel, it will be r, g, b...etc.
 */
export type TChannel = number;

/**
 * Type of coord, it will be x, y...etc.
 */
export type TCoord = number;

/**
 * Type of position, it will be [x, y]
 */
export type TPosition = [TCoord, TCoord];

/**
 * Type of Region, it will be [left, top, right, bottom]
 */
export type TRegion = [TCoord, TCoord, TCoord, TCoord];

/**
 * Type of pixel, it will be [r, g, b, a] etc
 */
export type TPixel = Uint8ClampedArray | TChannel[];

/**
 * Type of point, it will be [[x, y], pixel]
 */
export type TPoint = [TPosition, TPixel];

/**
 * Type of image buffer, it will be an Uint8ClampedArray, like [r1, b1, g1, a1, r2, g2, b2, a2...]
 */
export type TBuffer = Uint8ClampedArray;

/**
 * Type of image buffer, it will be an Uint8ClampedArray, like [r1, b1, g1, a1, r2, g2, b2, a2...]
 */
export type TClipMode =
    'ARC'
    | 'ELLIPSE'
    | 'RECT';

/**
 * Type of image buffer, it will be an Uint8ClampedArray, like [r1, b1, g1, a1, r2, g2, b2, a2...]
 */
export type TClipPath = number[];
