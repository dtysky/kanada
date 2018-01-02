/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: converting image from a color space to another color space.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TColorSpace} from '../constants';

function getRGBColorFromHSL(
    p: number,
    q: number,
    t: number,
    max: number
): number {
    return (
            t < 0.1667
                ? (p + ((q - p)) * 6 * t)
                : t < 0.5
                    ? q
                    : t < 0.6667
                        ? p + ((q - p) * 6 * (0.6667 - t))
                        : p
        ) * max;
}

export const colorSpaceConvert = (
    dstMode: TColorSpace
) => (image: ImageCore) => {
    const size = image.data.length;

    // No conversion needed
    if (image.mode === dstMode) {
        return image;
    }

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
            const [rmax, gmax, bmax] = COLOR_MAX.RGBA;
            const [kmax] = COLOR_MAX.CMYK;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    // from http://www.boost.org/doc/libs/1_53_0/boost/gil/color_convert.hpp
                    const dR = rmax - data[pos];
                    const dG = gmax - data[pos + 1];
                    const dB = bmax - data[pos + 2];
                    const k = Math.min(dR, dG, dB);
                    const x = (kmax - k) / kmax;
                    data[pos] = ~~((dR - k) / x);
                    data[pos + 1] = ~~((dG - k) / x);
                    data[pos + 2] = ~~((dB - k) / x);
                    data[pos + 3] = k;
                }
            });
            break;
        }
        case 'RGBA_HSL': {
            // http://www.rapidtables.com/convert/color/rgb-to-hsl.htm
            const [hmax, smax , lmax] = COLOR_MAX.HSL;
            const h1p6 = ~~(60 * hmax / 360);
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
                    if (l === 0 || dv === 0) {
                        data[pos + 1] = 0;
                    } else if (l <= l1p2) {
                        data[pos + 1] = ~~(lmax * dv / sv);
                    } else {
                        data[pos + 1] = ~~(lmax * dv / (2 * smax - sv));
                    }
                    switch (max) {
                        case min:
                            data[pos] = 0;
                            continue;
                        case r:
                            data[pos] = ~~(h1p6 * ((g - b) % 6) / dv);
                            continue;
                        case g:
                            data[pos] = ~~(h1p6 * ((b - r) / dv + 2));
                            continue;
                        case b:
                            data[pos] = ~~(h1p6 * ((r - g) / dv + 4));
                            continue;
                        default:
                            continue;
                    }
                }
            });
            break;
        }
        case 'RGBA_HSV': {
            // from https://en.wikipedia.org/wiki/HSL_and_HSV
            const [hmax, smax] = COLOR_MAX.HSV;
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
                    data[pos + 1] = max === 0 ? 0 : ~~(smax * (1 - min / max));
                    switch (max) {
                        case min:
                            data[pos] = 0;
                            continue;
                        case r:
                            data[pos] = g >= b
                                ? ~~(h1p6 * (g - b) / (max - min))
                                : ~~(hmax - h1p6 * (b - g) / (max - min));
                            continue;
                        case g:
                            data[pos] = ~~(h1p3 + h1p6 * (b - r) / (max - min));
                            continue;
                        case b:
                            data[pos] = ~~(h2p3 + h1p6 * (r - g) / (max - min));
                            continue;
                        default:
                            continue;
                    }
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
            // from http://www.rapidtables.com/convert/color/hsl-to-rgb.htm
            const [rmax, gmax, bmax] = COLOR_MAX.RGBA;
            const [hmax, smax, lmax] = COLOR_MAX.HSL;
            const h1p6 = hmax / 6;
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    const h = data[pos] / h1p6;
                    const s = data[pos + 1] / smax;
                    const l = data[pos + 2] / lmax;
                    const c = l < 0.5 ? (l * s) * 2 : ((1 - l) * s) * 2;
                    const x = c * (1 - Math.abs(h % 2 - 1));
                    const m = l - (c / 2);
                    switch (h >> 0) {
                        case 0:
                            data[pos] = (c + m) * rmax;
                            data[pos + 1] = (x + m) * gmax;
                            data[pos + 2] = m * bmax;
                            continue;
                        case 1:
                            data[pos] = (x + m) * rmax;
                            data[pos + 1] = (c + m) * gmax;
                            data[pos + 2] = m * bmax;
                            continue;
                        case 2:
                            data[pos] = m * rmax;
                            data[pos + 1] = (c + m) * gmax;
                            data[pos + 2] = (x + m) * bmax;
                            continue;
                        case 3:
                            data[pos] = m * rmax;
                            data[pos + 1] = (x + m) * gmax;
                            data[pos + 2] = (c + m) * bmax;
                            continue;
                        case 4:
                            data[pos] = (x + m) * rmax;
                            data[pos + 1] = m * gmax;
                            data[pos + 2] = (c + m) * bmax;
                            continue;
                        case 5:
                            data[pos] = (c + m) * rmax;
                            data[pos + 1] = m * gmax;
                            data[pos + 2] = (x + m) * bmax;
                            continue;
                        default:
                            continue;
                    }
                }
            });
            break;
        }
        case 'HSV_RGBA': {
            // from https://en.wikipedia.org/wiki/HSL_and_HSV
            const [rmax, gmax, bmax] = COLOR_MAX.RGBA;
            const [hmax, smax, vmax] = COLOR_MAX.HSV;
            const h1p6 = ~~(60 * hmax / 360);
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    const h = data[pos];
                    const s = data[pos + 1] / smax;
                    const v = data[pos + 2] / vmax;
                    const ht = h / h1p6;
                    const hi = ~~ht;
                    const f = ht - hi;
                    const p = v * (1 - s);
                    const q = v * (1 - f * s);
                    const t = v * (1 - (1 - f) * s);
                    switch (hi) {
                        case 0:
                            data[pos] = v * rmax;
                            data[pos + 1] = t * gmax;
                            data[pos + 2] = p * bmax;
                            continue;
                        case 1:
                            data[pos] = q * rmax;
                            data[pos + 1] = v * gmax;
                            data[pos + 2] = p * bmax;
                            continue;
                        case 2:
                            data[pos] = p * rmax;
                            data[pos + 1] = v * gmax;
                            data[pos + 2] = t * bmax;
                            continue;
                        case 3:
                            data[pos] = p * rmax;
                            data[pos + 1] = q * gmax;
                            data[pos + 2] = v * bmax;
                            continue;
                        case 4:
                            data[pos] = t * rmax;
                            data[pos + 1] = p * gmax;
                            data[pos + 2] = v * bmax;
                            continue;
                        case 5:
                            data[pos] = v * rmax;
                            data[pos + 1] = p * gmax;
                            data[pos + 2] = q * bmax;
                            continue;
                        default:
                            continue;
                    }
                }
            });
            break;
        }
        default:
            break;
    }
    return image.changeMode(dstMode);
}

