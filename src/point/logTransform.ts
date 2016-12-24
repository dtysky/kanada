/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: logarithmic transformation for each channel of pixels.
 */

import {ImageCore} from '../core';
import {COLOR_MAX} from '../constants';

/**
 * Logarithmic transformation, O = times * log(1 + I).
 * @param image {ImageCore}
 * @param times {number[]}
 * @returns {ImageCore}
 */
export function logTransform(
    image: ImageCore,
    times: number[]
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
            const [t1, t2, t3] = times;
            const border1 = Math.pow(2, max1 / t1) - 1;
            const border2 = Math.pow(2, max2 / t2) - 1;
            const border3 = Math.pow(2, max3 / t3) - 1;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.log2(1 + data[pos]));
                    data[pos + 1] = data[pos + 1] > border2 ? max2 : ~~(t2 * Math.log2(1 + data[pos + 1]));
                    data[pos + 2] = data[pos + 2] > border3 ? max3 : ~~(t3 * Math.log2(1 + data[pos + 2]));
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            const [max1] = COLOR_MAX[image.mode];
            const [t1] = times;
            const border1 = Math.pow(2, max1 / t1) - 1;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.log2(1 + data[pos]));
                }
            });
            break;
        }
        case 'CMYK': {
            const [max1, max2, max3, max4] = COLOR_MAX[image.mode];
            const [t1, t2, t3, t4] = times;
            const border1 = Math.pow(2, max1 / t1) - 1;
            const border2 = Math.pow(2, max2 / t2) - 1;
            const border3 = Math.pow(2, max3 / t3) - 1;
            const border4 = Math.pow(2, max4 / t4) - 1;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.log2(1 + data[pos]));
                    data[pos + 1] = data[pos + 1] > border2 ? max2 : ~~(t2 * Math.log2(1 + data[pos + 1]));
                    data[pos + 2] = data[pos + 2] > border3 ? max3 : ~~(t3 * Math.log2(1 + data[pos + 2]));
                    data[pos + 3] = data[pos + 3] > border4 ? max4 : ~~(t4 * Math.log2(1 + data[pos + 3]));
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
}
