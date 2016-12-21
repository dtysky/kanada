/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: image data for testing.
 */

import {genSamePointsBuffer} from '../utils';

export const white20x20 = genSamePointsBuffer([20, 20], [255, 255, 255, 255]);
export const black20x20 = genSamePointsBuffer([20, 20], [0, 0, 0, 255]);
