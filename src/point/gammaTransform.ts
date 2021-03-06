/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: gamma transformation for each channel of pixels.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TSize, TChannel} from '../constants';

function checkSize(
    times: number[],
    expectSize: TSize
): void {
    if (times.length !== expectSize) {
        throw new Exceptions.ArraySizeError('GammaTransform times', times.length, expectSize);
    }
}

function getBorder(
    max: TChannel,
    times: number,
    gain: number
): TChannel {
    return Math.pow((max / times), 1 / gain);
}

/**
 * Logarithmic transformation, O = times * I ^ gammas.
 * @param image {ImageCore}
 * @param times {number[]}
 * @param gammas {number[]}
 * @returns {ImageCore}
 */
export const gammaTransform = (
    times: number[] | number,
    gammas: number[] | number
) => (image: ImageCore) => {
    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            times = typeof times === 'number' ? [times, times, times] : times;
            gammas = typeof gammas === 'number' ? [gammas, gammas, gammas] : gammas;
            checkSize(times, 3);
            checkSize(gammas, 3);
            const [max1, max2, max3] = COLOR_MAX[image.mode];
            const [t1, t2, t3] = times;
            const [g1, g2, g3] = gammas;
            const border1 = getBorder(max1, t1,  g1);
            const border2 = getBorder(max2, t2,  g2);
            const border3 = getBorder(max3, t3,  g3);
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.pow(data[pos], g1));
                        data[pos + 1] = data[pos + 1] > border2 ? max2 : ~~(t2 * Math.pow(data[pos + 1], g2));
                        data[pos + 2] = data[pos + 2] > border3 ? max3 : ~~(t3 * Math.pow(data[pos + 2], g3));
                    }
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            times = typeof times === 'number' ? [times] : times;
            gammas = typeof gammas === 'number' ? [gammas] : gammas;
            checkSize(times, 1);
            checkSize(gammas, 1);
            const [max1] = COLOR_MAX[image.mode];
            const [t1] = times;
            const [g1] = gammas;
            const border1 = getBorder(max1, t1,  g1);
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.pow(data[pos], g1));
                    }
                }
            });
            break;
        }
        case 'CMYK': {
            times = typeof times === 'number' ? [times, times, times, times] : times;
            gammas = typeof gammas === 'number' ? [gammas, gammas, gammas, gammas] : gammas;
            checkSize(times, 4);
            checkSize(gammas, 4);
            const [max1, max2, max3, max4] = COLOR_MAX[image.mode];
            const [t1, t2, t3, t4] = times;
            const [g1, g2, g3, g4] = gammas;
            const border1 = getBorder(max1, t1,  g1);
            const border2 = getBorder(max2, t2,  g2);
            const border3 = getBorder(max3, t3,  g3);
            const border4 = getBorder(max4, t4,  g4);
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = data[pos] > border1 ? max1 : ~~(t1 * Math.pow(data[pos], g1));
                        data[pos + 1] = data[pos + 1] > border2 ? max2 : ~~(t2 * Math.pow(data[pos + 1], g2));
                        data[pos + 2] = data[pos + 2] > border3 ? max3 : ~~(t3 * Math.pow(data[pos + 2], g3));
                        data[pos + 3] = data[pos + 3] > border4 ? max4 : ~~(t4 * Math.pow(data[pos + 3], g4));
                    }
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
};
