/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description: Base function for local filter.
 */
import {ImageCore} from '../core';
import {TMatrix} from '../constants';
import {ConvolutionKernel} from './ConvolutionKernel';

export const convolutionFilter = (
    ck: ConvolutionKernel
) => (image: ImageCore) => {
    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    const size = ck.size;
    const hsize = size >> 1;
    const ckMatrix = ck.matrix;
    let channels = 1;

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
                const colors = [0, 0, 0, 0];

                for (let wpy = t; wpy <= b; wpy += 1) {
                    const wy = wpy - t;
                    for (let wpx = l; wpx <= r; wpx += 1) {
                        const wx = wpx - l;
                        if (!(wpx < 0 || wpx > width || wpy < 0 || wpy > height)) {
                            const posWP = (wpx + wpy * width) * 4;
                            // const posW = wx + wy * size;
                            colors[0] += data[posWP] * ckMatrix[wy][wx];
                            if (channels > 2) {
                                colors[1] += data[posWP + 1] * ckMatrix[wy][wx];
                                colors[2] += data[posWP + 2] * ckMatrix[wy][wx];
                            }
                            if (channels > 3) {
                                colors[3] += data[posWP + 3] * ckMatrix[wy][wx];
                            }
                        }
                    }
                }

                const pos = (x + y * width) * 4;
                data[pos] = colors[0];
                if (channels > 2) {
                    data[pos + 1] = colors[1];
                    data[pos + 2] = colors[2];
                }
                if (channels > 3) {
                    data[pos + 3] = colors[3];
                }
            }
        }
    });
    return image;
};
