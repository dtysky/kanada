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
