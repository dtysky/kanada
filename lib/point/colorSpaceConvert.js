"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: converting image from a color space to another color space.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var constants_1 = require("../constants");
function getRGBColorFromHSL(p, q, t, max) {
    return (t < 0.1667
        ? (p + ((q - p)) * 6 * t)
        : t < 0.5
            ? q
            : t < 0.6667
                ? p + ((q - p) * 6 * (0.6667 - t))
                : p) * max;
}
exports.colorSpaceConvert = function (dstMode) { return function (image) {
    var size = image.data.length;
    // No conversion needed
    if (image.mode === dstMode) {
        return image;
    }
    switch (image.mode + "_" + dstMode) {
        // Just converting alpha channel
        case 'BGRA_BGR':
        case 'RGBA_RGB':
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
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
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos + 1] = data[pos];
                    data[pos + 2] = data[pos];
                }
            });
            image.dataIsNormalized = true;
            return image.changeMode(dstMode);
        case 'B_L':
            return image.changeMode(dstMode);
        default:
            break;
    }
    // data will not be changed, this simplifies following options
    if (image.mode === 'RGB') {
        image.changeMode('RGBA');
    }
    if (image.mode !== 'RGBA' && dstMode !== 'RGBA') {
        throw new core_1.Exceptions.ColorSpaceError('one of the `srcMode` or `dstMode` should be RGB or RGBA, srcMode or dstMode', dstMode, 'RGB', 'RGBA');
    }
    if (dstMode === 'L' || dstMode === 'B') {
        throw new core_1.Exceptions.ColorSpaceError('the mode of image to be converted color space from RGBA', dstMode, 'RGB', 'BGR', 'BGRA', 'CMYK', 'HSL', 'HSV');
    }
    switch (image.mode + "_" + dstMode) {
        case 'RGBA_BGR':
            image.modifyData(function (data) {
                // the fastest way to swap
                for (var pos = 0; pos < size; pos += 4) {
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
            image.modifyData(function (data) {
                // the fastest way to swap
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] ^= data[pos + 2];
                    data[pos + 2] ^= data[pos];
                    data[pos] ^= data[pos + 2];
                }
            });
            break;
        }
        // the alpha channel will be removed
        case 'RGBA_CMYK': {
            var _a = constants_1.COLOR_MAX.RGBA, rmax_1 = _a[0], gmax_1 = _a[1], bmax_1 = _a[2];
            var kmax_1 = constants_1.COLOR_MAX.CMYK[0];
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    // from http://www.boost.org/doc/libs/1_53_0/boost/gil/color_convert.hpp
                    var dR = rmax_1 - data[pos];
                    var dG = gmax_1 - data[pos + 1];
                    var dB = bmax_1 - data[pos + 2];
                    var k = Math.min(dR, dG, dB);
                    var x = (kmax_1 - k) / kmax_1;
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
            var _b = constants_1.COLOR_MAX.HSL, hmax = _b[0], smax_1 = _b[1], lmax_1 = _b[2];
            var h1p6_1 = ~~(60 * hmax / 360);
            var l1p2_1 = lmax_1 >> 1;
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    var r = data[pos];
                    var g = data[pos + 1];
                    var b = data[pos + 2];
                    var max = Math.max(r, g, b);
                    var min = Math.min(r, g, b);
                    var dv = max - min;
                    var sv = max + min;
                    var l = sv >> 1;
                    data[pos + 2] = l;
                    if (l === 0 || dv === 0) {
                        data[pos + 1] = 0;
                    }
                    else if (l <= l1p2_1) {
                        data[pos + 1] = ~~(lmax_1 * dv / sv);
                    }
                    else {
                        data[pos + 1] = ~~(lmax_1 * dv / (2 * smax_1 - sv));
                    }
                    switch (max) {
                        case min:
                            data[pos] = 0;
                            continue;
                        case r:
                            data[pos] = ~~(h1p6_1 * ((g - b) % 6) / dv);
                            continue;
                        case g:
                            data[pos] = ~~(h1p6_1 * ((b - r) / dv + 2));
                            continue;
                        case b:
                            data[pos] = ~~(h1p6_1 * ((r - g) / dv + 4));
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
            var _c = constants_1.COLOR_MAX.HSV, hmax_1 = _c[0], smax_2 = _c[1];
            var h1p6_2 = ~~(60 * hmax_1 / 360);
            var h1p3_1 = ~~(120 * hmax_1 / 360);
            var h2p3_1 = ~~(240 * hmax_1 / 360);
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    var r = data[pos];
                    var g = data[pos + 1];
                    var b = data[pos + 2];
                    var max = Math.max(r, g, b);
                    var min = Math.min(r, g, b);
                    data[pos + 2] = max;
                    data[pos + 1] = max === 0 ? 0 : ~~(smax_2 * (1 - min / max));
                    switch (max) {
                        case min:
                            data[pos] = 0;
                            continue;
                        case r:
                            data[pos] = g >= b
                                ? ~~(h1p6_2 * (g - b) / (max - min))
                                : ~~(hmax_1 - h1p6_2 * (b - g) / (max - min));
                            continue;
                        case g:
                            data[pos] = ~~(h1p3_1 + h1p6_2 * (b - r) / (max - min));
                            continue;
                        case b:
                            data[pos] = ~~(h2p3_1 + h1p6_2 * (r - g) / (max - min));
                            continue;
                        default:
                            continue;
                    }
                }
            });
            break;
        }
        case 'CMYK_RGBA': {
            image.modifyData(function (data) {
                var _a = constants_1.COLOR_MAX[image.mode], cmax = _a[0], mmax = _a[1], ymax = _a[2], kmax = _a[3];
                for (var pos = 0; pos < size; pos += 4) {
                    // from http://www.boost.org/doc/libs/1_53_0/boost/gil/color_convert.hpp
                    var k = data[pos + 3];
                    var dk = (kmax - k) / kmax;
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
            var _d = constants_1.COLOR_MAX.RGBA, rmax_2 = _d[0], gmax_2 = _d[1], bmax_2 = _d[2];
            var _e = constants_1.COLOR_MAX.HSL, hmax = _e[0], smax_3 = _e[1], lmax_2 = _e[2];
            var h1p6_3 = hmax / 6;
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    var h = data[pos] / h1p6_3;
                    var s = data[pos + 1] / smax_3;
                    var l = data[pos + 2] / lmax_2;
                    var c = l < 0.5 ? (l * s) * 2 : ((1 - l) * s) * 2;
                    var x = c * (1 - Math.abs(h % 2 - 1));
                    var m = l - (c / 2);
                    switch (h >> 0) {
                        case 0:
                            data[pos] = (c + m) * rmax_2;
                            data[pos + 1] = (x + m) * gmax_2;
                            data[pos + 2] = m * bmax_2;
                            continue;
                        case 1:
                            data[pos] = (x + m) * rmax_2;
                            data[pos + 1] = (c + m) * gmax_2;
                            data[pos + 2] = m * bmax_2;
                            continue;
                        case 2:
                            data[pos] = m * rmax_2;
                            data[pos + 1] = (c + m) * gmax_2;
                            data[pos + 2] = (x + m) * bmax_2;
                            continue;
                        case 3:
                            data[pos] = m * rmax_2;
                            data[pos + 1] = (x + m) * gmax_2;
                            data[pos + 2] = (c + m) * bmax_2;
                            continue;
                        case 4:
                            data[pos] = (x + m) * rmax_2;
                            data[pos + 1] = m * gmax_2;
                            data[pos + 2] = (c + m) * bmax_2;
                            continue;
                        case 5:
                            data[pos] = (c + m) * rmax_2;
                            data[pos + 1] = m * gmax_2;
                            data[pos + 2] = (x + m) * bmax_2;
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
            var _f = constants_1.COLOR_MAX.RGBA, rmax_3 = _f[0], gmax_3 = _f[1], bmax_3 = _f[2];
            var _g = constants_1.COLOR_MAX.HSV, hmax = _g[0], smax_4 = _g[1], vmax_1 = _g[2];
            var h1p6_4 = ~~(60 * hmax / 360);
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    var h = data[pos];
                    var s = data[pos + 1] / smax_4;
                    var v = data[pos + 2] / vmax_1;
                    var ht = h / h1p6_4;
                    var hi = ~~ht;
                    var f = ht - hi;
                    var p = v * (1 - s);
                    var q = v * (1 - f * s);
                    var t = v * (1 - (1 - f) * s);
                    switch (hi) {
                        case 0:
                            data[pos] = v * rmax_3;
                            data[pos + 1] = t * gmax_3;
                            data[pos + 2] = p * bmax_3;
                            continue;
                        case 1:
                            data[pos] = q * rmax_3;
                            data[pos + 1] = v * gmax_3;
                            data[pos + 2] = p * bmax_3;
                            continue;
                        case 2:
                            data[pos] = p * rmax_3;
                            data[pos + 1] = v * gmax_3;
                            data[pos + 2] = t * bmax_3;
                            continue;
                        case 3:
                            data[pos] = p * rmax_3;
                            data[pos + 1] = q * gmax_3;
                            data[pos + 2] = v * bmax_3;
                            continue;
                        case 4:
                            data[pos] = t * rmax_3;
                            data[pos + 1] = p * gmax_3;
                            data[pos + 2] = v * bmax_3;
                            continue;
                        case 5:
                            data[pos] = v * rmax_3;
                            data[pos + 1] = p * gmax_3;
                            data[pos + 2] = q * bmax_3;
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
}; };
