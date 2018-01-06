/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description: Base function for sort filter.
 */

import {ImageCore, Exceptions} from '../core';

function genWindow (size: number) {
    const win = new Array(size * size);
    return win;
}

export const rankFilter = (
    size: number,
    rank: number
) => (image: ImageCore) => {
    const length = size * size;
    if (length < rank) {
        throw new Exceptions.SizeError('Rank', rank, `less than window length: ${length}`);
    }

    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    const hsize = size >> 1;
    let channels = 1;
    const windows = [genWindow(size), genWindow(size), genWindow(size), genWindow(size)];

    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            channels = 3;
            break;
        }
        case 'CMYK': {
            channels = 4;
            break;
        }
        default:
            break;
    }

    image.modifyData(data => {
        for (let y = top; y < bottom; y += 1) {
            for (let x = left; x < right; x += 1) {
                const l = x - hsize;
                const r = x + hsize;
                const t = y - hsize;
                const b = y + hsize;

                let posW = 0;
                for (let wpy = t; wpy <= b; wpy += 1) {
                    for (let wpx = l; wpx <= r; wpx += 1) {
                        if (!(wpx < 0 || wpx > width || wpy < 0 || wpy > height)) {
                            const posWP = (wpx + wpy * width) * 4;
                            windows[0][posW] = data[posWP];
                            if (channels > 2) {
                                windows[1][posW] = data[posWP + 1];
                                windows[2][posW] = data[posWP + 2];
                            }
                            if (channels > 3) {
                                windows[3][posW] = data[posWP + 3];
                            }
                        } else {
                            windows[0][posW] = 0;
                            if (channels > 2) {
                                windows[1][posW] = 0;
                                windows[2][posW] = 0;
                            }
                            if (channels > 3) {
                                windows[3][posW] = 0;
                            }
                        }
                        posW += 1;
                    }
                }

                const pos = (x + y * width) * 4;
                data[pos] = windows[0].sort()[rank];
                if (channels > 2) {
                    data[pos + 1] = windows[1].sort()[rank];
                    data[pos + 2] = windows[2].sort()[rank];
                }
                if (channels > 3) {
                    data[pos + 3] = windows[3].sort()[rank];
                }
            }
        }
    });
    return image;
};
