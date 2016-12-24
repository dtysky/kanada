/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: image data for testing.
 */

import {genSamePointsBuffer} from '../utils';

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

// linearTransform
export namespace LT20x20 {
    export const RGBA_G = [106, -101, 100];
    export const RGBA_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const RGBA_R = genSamePointsBuffer([20, 20], [255, 0, 150, 200]);

    export const RGB_G = LT20x20.RGBA_G;
    export const RGB_O = genSamePointsBuffer([20, 20], [150, 100, 50, 255]);
    export const RGB_R = genSamePointsBuffer([20, 20], [255, 0, 150, 255]);

    export const BGRA_G = LT20x20.RGBA_G;
    export const BGRA_O = LT20x20.RGB_O;
    export const BGRA_R = LT20x20.RGB_R;

    export const BGR_G = LT20x20.RGB_G;
    export const BGR_O = LT20x20.RGB_O;
    export const BGR_R = LT20x20.RGB_R;

    export const L_G = [100];
    export const L_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const L_R = genSamePointsBuffer([20, 20], [250, 100, 50, 200]);

    export const B_G = LT20x20.L_G;
    export const B_O = LT20x20.L_O;
    export const B_R = LT20x20.L_R;

    export const CMYK_G = [106, -101, 100, -50];
    export const CMYK_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const CMYK_R = genSamePointsBuffer([20, 20], [255, 0, 150, 150]);

    export const HSV_G = [91, -101, 100];
    export const HSV_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const HSV_R = genSamePointsBuffer([20, 20], [240, 0, 150, 200]);

    export const HSL_G = LT20x20.HSV_G;
    export const HSL_O = LT20x20.HSV_O;
    export const HSL_R = LT20x20.HSV_R;
}

// logTransform
export namespace LOGT20x20 {
    export const RGBA_T = [37, 0.1, 26.5];
    export const RGBA_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const RGBA_R = genSamePointsBuffer([20, 20], [255, 0, 150, 200]);

    export const RGB_T = LOGT20x20.RGBA_T;
    export const RGB_O = genSamePointsBuffer([20, 20], [150, 100, 50, 255]);
    export const RGB_R = genSamePointsBuffer([20, 20], [255, 0, 150, 255]);

    export const BGRA_T = LOGT20x20.RGBA_T;
    export const BGRA_O = LOGT20x20.RGB_O;
    export const BGRA_R = LOGT20x20.RGB_R;

    export const BGR_T = LOGT20x20.RGB_T;
    export const BGR_O = LOGT20x20.RGB_O;
    export const BGR_R = LOGT20x20.RGB_R;

    export const L_T = [34.6];
    export const L_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const L_R = genSamePointsBuffer([20, 20], [250, 100, 50, 200]);

    export const B_T = LOGT20x20.L_T;
    export const B_O = LOGT20x20.L_O;
    export const B_R = LOGT20x20.L_R;

    export const CMYK_T = [37, 0.1, 26.5, 19.7];
    export const CMYK_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const CMYK_R = genSamePointsBuffer([20, 20], [255, 0, 150, 150]);

    export const HSV_T = [34, 0.1, 26.5];
    export const HSV_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const HSV_R = genSamePointsBuffer([20, 20], [240, 0, 150, 200]);

    export const HSL_T = LOGT20x20.HSV_T;
    export const HSL_O = LOGT20x20.HSV_O;
    export const HSL_R = LOGT20x20.HSV_R;
}

// gammaTransform
export namespace GT20x20 {
    export const RGBA_T = [0.5, 0, 2];
    export const RGBA_G = [1.3, 50, 1.1];
    export const RGBA_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const RGBA_R = genSamePointsBuffer([20, 20], [255, 0, 147, 200]);

    export const RGB_T = GT20x20.RGBA_T;
    export const RGB_G = GT20x20.RGBA_G;
    export const RGB_O = genSamePointsBuffer([20, 20], [150, 100, 50, 255]);
    export const RGB_R = genSamePointsBuffer([20, 20], [255, 0, 147, 255]);

    export const BGRA_T = GT20x20.RGBA_T;
    export const BGRA_G = GT20x20.RGBA_G;
    export const BGRA_O = GT20x20.RGB_O;
    export const BGRA_R = GT20x20.RGB_R;

    export const BGR_T = GT20x20.RGB_T;
    export const BGR_G = GT20x20.RGB_G;
    export const BGR_O = GT20x20.RGB_O;
    export const BGR_R = GT20x20.RGB_R;

    export const L_T = [0.5];
    export const L_G = [1.24];
    export const L_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const L_R = genSamePointsBuffer([20, 20], [249, 100, 50, 200]);

    export const B_T = GT20x20.L_T;
    export const B_G = GT20x20.L_G;
    export const B_O = GT20x20.L_O;
    export const B_R = GT20x20.L_R;

    export const CMYK_T = [0.5, 0, 2, 1];
    export const CMYK_G = [1.3, 50, 1.1, 0.9];
    export const CMYK_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const CMYK_R = genSamePointsBuffer([20, 20], [255, 0, 147, 117]);

    export const HSV_T = [0.5, 0, 2];
    export const HSV_G = [1.24, 50, 1.1];
    export const HSV_O = genSamePointsBuffer([20, 20], [150, 100, 50, 200]);
    export const HSV_R = genSamePointsBuffer([20, 20], [240, 0, 147, 200]);

    export const HSL_G = GT20x20.HSV_G;
    export const HSL_T = GT20x20.HSV_T;
    export const HSL_O = GT20x20.HSV_O;
    export const HSL_R = GT20x20.HSV_R;
}
