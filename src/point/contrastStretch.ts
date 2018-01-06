/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2 Jan 2018
 * Description: contrast stretch.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TSize, TChannel, TColorSpace} from '../constants';

const allowMode: TColorSpace[] = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L'];

export const contrastStretch = (
    r1: TChannel,
    s1: TChannel,
    r2: TChannel,
    s2: TChannel
) => (image: ImageCore) => {
    if (allowMode.indexOf(image.mode) < 0) {
        throw new Exceptions.ColorSpaceError('the mode of image to be contrastStretch', image.mode, ...allowMode);
    }
    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    const max = COLOR_MAX[image.mode][0];
    const k1 = s1 / r1;
    const km1 = (max - s2) / (max - r2);
    const k21 = (s2 - s1) / (r2 - r1);
    const opt = (channel: TChannel) => {
        let res = 0;
        if (channel < r1) {
            res = channel * k1;
        } else if (channel < r2) {
            res = channel * km1 + s2;
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
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = opt(data[pos]);
                        data[pos + 1] = opt(data[pos + 1]);
                        data[pos + 2] = opt(data[pos + 2]);
                    }
                }
            });
            break;
        }
        case 'L': {
            image.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos] = opt(data[pos]);
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
