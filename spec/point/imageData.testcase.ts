/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: image data for testing.
 */

import {genSamePointsBuffer} from '../utils';
import {TBuffer} from '../../src/constants';

// grayscale
export const rgba20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 200]);
export const bgra20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 200]);
export const rgb20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 255]);
export const bgr20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 255]);

export const gray20x20Rgba = genSamePointsBuffer([20, 20], [89, 89, 89, 200]);
export const gray20x20Bgra = genSamePointsBuffer([20, 20], [107, 107, 107, 200]);
export const gray20x20Rgb = genSamePointsBuffer([20, 20], [89, 89, 89, 255]);
export const gray20x20Bgr = genSamePointsBuffer([20, 20], [107, 107, 107, 255]);

// colorSpaceConvert
export const cscRgba20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 200]);
export const cscBgra20x20 = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
export const cscRgb20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 255]);
export const cscBgr20x20 = genSamePointsBuffer([20, 20], [150, 100, 50, 255]);

export const cscL2RGBA20x20L = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
export const cscL2RGBA20x20RGBA = genSamePointsBuffer([20, 20], [150, 150, 150, 200]);

export const cscCMYK20x20 = genSamePointsBuffer([20, 20], [170, 85, 0, 105]);
export const cscHSL20x20 = genSamePointsBuffer([20, 20], [140, 127, 100, 200]);
export const cscHSV20x20 = genSamePointsBuffer([20, 20], [140, 170, 150, 200]);

// colorResverse
export namespace CR20x20 {
    export const RGBA_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const RGBA_R = genSamePointsBuffer([20, 20], [105, 155, 205, 200]);

    export const RGB_O = genSamePointsBuffer([20, 20], [150, 100, 50, 255]);
    export const RGB_R = genSamePointsBuffer([20, 20], [105, 155, 205, 255]);

    export const BGRA_O = CR20x20.RGB_O;
    export const BGRA_R = CR20x20.RGB_R;

    export const BGR_O = CR20x20.RGBA_O;
    export const BGR_R = CR20x20.RGBA_R;

    export const L_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const L_R = genSamePointsBuffer([20, 20], [105, 100, 50, 200]);

    export const B_O = CR20x20.L_O;
    export const B_R = CR20x20.L_R;

    export const CMYK_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const CMYK_R = genSamePointsBuffer([20, 20], [105, 155, 205, 55]);

    export const HSV_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const HSV_R = genSamePointsBuffer([20, 20], [90, 155, 205, 200]);

    export const HSL_O = CR20x20.HSV_O;
    export const HSL_R = CR20x20.HSV_R;
}
