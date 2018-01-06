/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2 Jan 2018
 * Description: Gray layered.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TSize, TChannel, TColorSpace} from '../constants';

const allowMode: TColorSpace[] = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L'];

function checkSize(
    color: TChannel[],
    expectSize: TSize
): void {
    if (color.length !== expectSize) {
        throw new Exceptions.ArraySizeError('GrayLayered color', color.length, expectSize);
    }
}

export const grayLayered = (
    r1: TChannel,
    s1: TChannel,
    r2: TChannel,
    s2: TChannel,
    color: TChannel[] = [0, 0, 0]
) => (image: ImageCore) => {
    if (allowMode.indexOf(image.mode) < 0) {
        throw new Exceptions.ColorSpaceError('the mode of image to be grayLayered', image.mode, ...allowMode);
    }
    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    const max = COLOR_MAX[image.mode][0];
    const k1 = s1 / r1;
    const k21 = (s2 - s1) / (r2 - r1);
    const opt = (channel: TChannel, index: 0 | 1 | 2) => {
        let res = 0;
        if (channel < r1) {
            res = channel * k1;
        } else if (channel < r2) {
            res = color[index];
        } else {
            res = channel * k21 + s1;
        }

        return res;
    };

    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA': {
            checkSize(color, 3);
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = opt(data[pos], 0);
                        data[pos + 1] = opt(data[pos + 1], 1);
                        data[pos + 2] = opt(data[pos + 2], 2);
                    }
                }
            });
            break;
        }
        case 'L': {
            checkSize(color, 1);
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = opt(data[pos], 0);
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
