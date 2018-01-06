/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description: Bits cut.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TColorSpace} from '../constants';

const allowMode: TColorSpace[] = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L', 'CMYK'];

const genMask = (low: number, high: number) => {
    let s = '';
    for (let i = 0; i <= high; i += 1) {
        s = (i < low ? '0' : '1') + s;
    }
    return parseInt(s, 2);
};

export const bitsCut = (
    lowBit: number,
    highBit?: number
) => (image: ImageCore) => {
    if (allowMode.indexOf(image.mode) < 0) {
        throw new Exceptions.ColorSpaceError('the mode of image to be bitsCut', image.mode, ...allowMode);
    }
    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    highBit = highBit || 7;
    const mask = genMask(lowBit, highBit);
    image.modifyData(data => {
        for (let y = top; y < bottom; y += 1) {
            for (let x = left; x < right; x += 1) {
                const pos = (x + y * width) << 2;
                data[pos] = data[pos] & mask;
                switch (image.mode) {
                    case 'RGB':
                    case 'RGBA':
                    case 'BGR':
                    case 'BGRA': 
                        data[pos + 1] = data[pos + 1] & mask;
                        data[pos + 2] = data[pos + 2] & mask;
                    case 'CMYK':
                        data[pos + 3] = data[pos + 3] & mask;
                        break;
                    default:
                        break;
                }
            }
        }
    });
    return image;
};
