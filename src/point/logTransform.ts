/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: logarithmic transformation for each channel of pixels.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TSize, TChannel} from '../constants';

function checkSize(
    times: number[],
    expectSize: TSize
): void {
    if (times.length !== expectSize) {
        throw new Exceptions.ArraySizeError('LogTransform times', times.length, expectSize);
    }
}

function getBorder(
    max: TChannel,
    times: number
): TChannel {
    return Math.pow(2, max / times) - 1;
}

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
            checkSize(times, 3);
            const [max1, max2, max3] = COLOR_MAX[image.mode];
            const [t1, t2, t3] = times;
            const border1 = getBorder(max1, t1);
            const border2 = getBorder(max2, t2);
            const border3 = getBorder(max3, t3);
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
            checkSize(times, 1);
            const [max1] = COLOR_MAX[image.mode];
            const [t1] = times;
            const border1 = getBorder(max1, t1);
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.log2(1 + data[pos]));
                }
            });
            break;
        }
        case 'CMYK': {
            checkSize(times, 4);
            const [max1, max2, max3, max4] = COLOR_MAX[image.mode];
            const [t1, t2, t3, t4] = times;
            const border1 = getBorder(max1, t1);
            const border2 = getBorder(max2, t2);
            const border3 = getBorder(max3, t3);
            const border4 = getBorder(max4, t4);
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
