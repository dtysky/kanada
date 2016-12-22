/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: converting image from a color space to another color space.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TColorSpace} from '../constants';

export function colorSpaceConvert(
    image: ImageCore,
    dstMode: TColorSpace
): ImageCore {
    const size = image.data.length;

    switch (`${image.mode}_${dstMode}`) {
        // Just converting alpha channel
        case 'BGRA_BGR':
        case 'RGBA_RGB':
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos + 3] = 255;
                }
            });
            return image.changeMode(dstMode);
        // No data conversion needed
        case 'RGB_RGBA':
        case 'BGR_BGRA':
            return image.changeMode(dstMode);
        // Filling all channels with the first channel
        case 'L_RGBA':
        case 'L_BGRA':
        case 'L_RGB':
        case 'L_BGR':
        case 'B_RGBA':
        case 'B_BGRA':
        case 'B_RGB':
        case 'B_BGR':
        case 'B_L':
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos + 1] = data[pos];
                    data[pos + 2] = data[pos];
                }
            });
            return image.changeMode(dstMode);
        default:
            break;
    }

    // data will not be changed, this simplifies following options
    if (image.mode === 'RGB') {
        image.changeMode('RGBA');
    }

    if (image.mode !== 'RGBA' && dstMode !== 'RGBA') {
        throw new Exceptions.ColorSpaceError(
            'one of the `srcMode` or `dstMode` should be RGB or RGBA, srcMode or dstMode',
            dstMode, 'RGB', 'RGBA'
        );
    }

    if (dstMode === 'L' || dstMode === 'B') {
        throw new Exceptions.ColorSpaceError(
            'the mode of image to be converted color space from RGBA',
            dstMode, 'RGB', 'BGR', 'BGRA', 'CMYK', 'HSL', 'HSV'
        );
    }

    // No conversion needed
    if (image.mode === dstMode) {
        return image;
    }

    switch (`${image.mode}_${dstMode}`) {
        case 'RGBA_BGR':
            image.modifyData(data => {
                // the fastest way to swap
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] ^= data[pos + 2];
                    data[pos + 2] ^= data[pos];
                    data[pos] ^= data[pos + 2];
                    data[pos + 3] = 255;
                }
            });
            break;
        case 'RGBA_BGRA':
        case 'BGRA_RGBA':
        case 'BGR_RGBA': {
            image.modifyData(data => {
                // the fastest way to swap
                for (let pos = 0; pos < size; pos += 4) {
                    data[pos] ^= data[pos + 2];
                    data[pos + 2] ^= data[pos];
                    data[pos] ^= data[pos + 2];
                }
            });
            break;
        }
        // the alpha channel will be removed
        case 'RGBA_CMYK': {
            const [cmax, mmax, ymax, kmax] = COLOR_MAX[image.mode];
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    // from http://www.boost.org/doc/libs/1_53_0/boost/gil/color_convert.hpp
                    const c = cmax - data[pos];
                    const m = mmax - data[pos + 1];
                    const y = ymax - data[pos + 2];
                    const k = Math.min(c, m, y);
                    const x = (kmax - data[pos + 3]) / kmax;
                    data[pos] = ~~((c - k) / x);
                    data[pos + 1] = ~~((m - k) / x);
                    data[pos + 2] = ~~((y - k) / x);
                    data[pos + 3] = k;
                }
            });
            break;
        }
        case 'RGBA_HSL': {
            const [hmax, , lmax] = COLOR_MAX[image.mode];
            const h1p6 = ~~(60 * hmax / 360);
            const h1p3 = ~~(120 * hmax / 360);
            const h2p3 = ~~(240 * hmax / 360);
            const l1p2 = lmax >> 1;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    const r = data[pos];
                    const g = data[pos + 1];
                    const b = data[pos + 2];
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    const dv = max - min;
                    const sv = max + min;
                    const l = sv >> 1;
                    data[pos + 2] = l;
                    switch (max) {
                        case min:
                            data[pos] = 0;
                            break;
                        case r:
                            data[pos] = g >= b ? ~~(h1p6 * (g - b) / dv) : ~~(hmax - h1p6 * (b - g) / dv);
                            break;
                        case g:
                            data[pos] = ~~(h1p3 + h1p6 * (b - r) / dv);
                            break;
                        case b:
                            data[pos] = ~~(h2p3 + h1p6 * (r - g) / dv);
                            break;
                        default:
                            break;
                    }
                    if (l === 0 || dv === 0) {
                        data[pos + 1] = 0;
                        return;
                    }
                    if (l <= l1p2) {
                        data[pos + 1] = ~~(lmax * dv / sv);
                        return;
                    }
                    data[pos + 1] = ~~(lmax * dv / (2 * lmax - sv));
                }
            });
            break;
        }
        case 'RGBA_HSV': {
            const [hmax, smax] = COLOR_MAX[image.mode];
            const h1p6 = ~~(60 * hmax / 360);
            const h1p3 = ~~(120 * hmax / 360);
            const h2p3 = ~~(240 * hmax / 360);
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    const r = data[pos];
                    const g = data[pos + 1];
                    const b = data[pos + 2];
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    data[pos + 2] = max;
                    switch (max) {
                        case min:
                            data[pos] = 0;
                            break;
                        case r:
                            data[pos] = g >= b
                                ? ~~(h1p6 * (g - b) / (max - min))
                                : ~~(hmax - h1p6 * (b - g) / (max - min));
                            break;
                        case g:
                            data[pos] = ~~(h1p3 + h1p6 * (b - r) / (max - min));
                            break;
                        case b:
                            data[pos] = ~~(h2p3 + h1p6 * (r - g) / (max - min));
                            break;
                        default:
                            break;
                    }
                    data[pos + 1] = max === 0 ? 0 : ~~(smax * (1 - min / max));
                }
            });
            break;
        }
        case 'CMYK_RGBA': {
            image.modifyData(data => {
                const [cmax, mmax, ymax, kmax] = COLOR_MAX[image.mode];
                for (let pos = 0; pos < size; pos += 4) {
                    // from http://www.boost.org/doc/libs/1_53_0/boost/gil/color_convert.hpp
                    const k = data[pos + 3];
                    const dk = (kmax - k) / kmax;
                    data[pos] = ~~(cmax - Math.min(cmax, data[pos] * dk + k));
                    data[pos + 1] = ~~(mmax - Math.min(mmax, data[pos + 1] * dk + k));
                    data[pos + 2] = ~~(ymax - Math.min(ymax, data[pos + 2] * dk + k));
                    data[pos + 3] = 255;
                }
            });
            break;
        }
        case 'HSL_RGBA': {
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
        case 'HSV_RGBA': {
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
        default:
            break;
    }
    return image.changeMode(dstMode);
}

