/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: linear transformation for each channel of pixels.
 */

import {ImageCore} from '../core';
import {COLOR_MAX, TChannel} from '../constants';

export function linearTransform(
    image: ImageCore,
    gains: TChannel[]
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
            const [gain1, gain2, gain3] = gains;
            const border1 = max1 - gain1;
            const border2 = max2 - gain2;
            const border3 = max3 - gain3;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : data[pos] + gain1;
                    data[pos + 1] = data[pos + 1] > border2 ? max2 : data[pos + 1] + gain2;
                    data[pos + 2] = data[pos + 2] > border3 ? max3 : data[pos + 2] + gain3;
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            const [max1] = COLOR_MAX[image.mode];
            const [gain1] = gains;
            const border1 = max1 - gain1;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : data[pos] + gain1;
                }
            });
            break;
        }
        case 'CMYK': {
            const [max1, max2, max3, max4] = COLOR_MAX[image.mode];
            const [gain1, gain2, gain3, gain4] = gains;
            const border1 = max1 - gain1;
            const border2 = max2 - gain2;
            const border3 = max3 - gain3;
            const border4 = max4 - gain4;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1 ? max1 : data[pos] + gain1;
                    data[pos + 1] = data[pos + 1] > border2 ? max2 : data[pos + 1] + gain2;
                    data[pos + 2] = data[pos + 2] > border3 ? max3 : data[pos + 2] + gain3;
                    data[pos + 3] = data[pos + 3] > border4 ? max4 : data[pos + 3] + gain4;
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
}
