/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: reversal color of image.
 */

import {ImageCore} from '../core';
import {COLOR_MAX} from '../constants';

export function colorReversal(
    image: ImageCore
): ImageCore {
    const size = image.data.length;
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            const [max1, max2, max3] = COLOR_MAX[image.mode];
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = max1 - data[pos];
                    data[pos + 1] = max2 - data[pos + 1];
                    data[pos + 2] = max3 - data[pos + 2];
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            const [max1] = COLOR_MAX[image.mode];
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = max1 - data[pos];
                }
            });
            break;
        }
        case 'CMYK': {
            const [max1, max2, max3, max4] = COLOR_MAX[image.mode];
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = max1 - data[pos];
                    data[pos + 1] = max2 - data[pos + 1];
                    data[pos + 2] = max3 - data[pos + 2];
                    data[pos + 3] = max4 - data[pos + 3];
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
}
