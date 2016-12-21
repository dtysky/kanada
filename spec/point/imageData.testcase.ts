/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: image data for testing.
 */

import {genSamePointsBuffer} from '../utils';

export const rgba20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 200]);
export const bgra20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 200]);
export const rgb20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 255]);
export const bgr20x20 = genSamePointsBuffer([20, 20], [50, 100, 150, 255]);

export const gray20x20Rgba = genSamePointsBuffer([20, 20], [89, 89, 89, 200]);
export const gray20x20Bgra = genSamePointsBuffer([20, 20], [107, 107, 107, 200]);
export const gray20x20Rgb = genSamePointsBuffer([20, 20], [89, 89, 89, 255]);
export const gray20x20Bgr = genSamePointsBuffer([20, 20], [107, 107, 107, 255]);
