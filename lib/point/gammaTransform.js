"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: gamma transformation for each channel of pixels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var constants_1 = require("../constants");
function checkSize(times, expectSize) {
    if (times.length !== expectSize) {
        throw new core_1.Exceptions.ArraySizeError('GammaTransform times', times.length, expectSize);
    }
}
function getBorder(max, times, gain) {
    return Math.pow((max / times), 1 / gain);
}
/**
 * Logarithmic transformation, O = times * I ^ gammas.
 * @param image {ImageCore}
 * @param times {number[]}
 * @param gammas {number[]}
 * @returns {ImageCore}
 */
exports.gammaTransform = function (times, gammas) { return function (image) {
    times = typeof times === 'number' ? [times, times, times] : times;
    gammas = typeof gammas === 'number' ? [gammas, gammas, gammas] : gammas;
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            checkSize(times, 3);
            var _c = constants_1.COLOR_MAX[image.mode], max1_1 = _c[0], max2_1 = _c[1], max3_1 = _c[2];
            var t1_1 = times[0], t2_1 = times[1], t3_1 = times[2];
            var g1_1 = gammas[0], g2_1 = gammas[1], g3_1 = gammas[2];
            var border1_1 = getBorder(max1_1, t1_1, g1_1);
            var border2_1 = getBorder(max2_1, t2_1, g2_1);
            var border3_1 = getBorder(max3_1, t3_1, g3_1);
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = data[pos] > border1_1 ? max1_1 : ~~(t1_1 * Math.pow(data[pos], g1_1));
                        data[pos + 1] = data[pos + 1] > border2_1 ? max2_1 : ~~(t2_1 * Math.pow(data[pos + 1], g2_1));
                        data[pos + 2] = data[pos + 2] > border3_1 ? max3_1 : ~~(t3_1 * Math.pow(data[pos + 2], g3_1));
                    }
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            checkSize(times, 1);
            var max1_2 = constants_1.COLOR_MAX[image.mode][0];
            var t1_2 = times[0];
            var g1_2 = gammas[0];
            var border1_2 = getBorder(max1_2, t1_2, g1_2);
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = data[pos] > border1_2 ? max1_2 : ~~(t1_2 * Math.pow(data[pos], g1_2));
                    }
                }
            });
            break;
        }
        case 'CMYK': {
            checkSize(times, 4);
            var _d = constants_1.COLOR_MAX[image.mode], max1_3 = _d[0], max2_2 = _d[1], max3_2 = _d[2], max4_1 = _d[3];
            var t1_3 = times[0], t2_2 = times[1], t3_2 = times[2], t4_1 = times[3];
            var g1_3 = gammas[0], g2_2 = gammas[1], g3_2 = gammas[2], g4_1 = gammas[3];
            var border1_3 = getBorder(max1_3, t1_3, g1_3);
            var border2_2 = getBorder(max2_2, t2_2, g2_2);
            var border3_2 = getBorder(max3_2, t3_2, g3_2);
            var border4_1 = getBorder(max4_1, t4_1, g4_1);
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = data[pos] > border1_3 ? max1_3 : ~~(t1_3 * Math.pow(data[pos], g1_3));
                        data[pos + 1] = data[pos + 1] > border2_2 ? max2_2 : ~~(t2_2 * Math.pow(data[pos + 1], g2_2));
                        data[pos + 2] = data[pos + 2] > border3_2 ? max3_2 : ~~(t3_2 * Math.pow(data[pos + 2], g3_2));
                        data[pos + 3] = data[pos + 3] > border4_1 ? max4_1 : ~~(t4_1 * Math.pow(data[pos + 3], g4_1));
                    }
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
}; };
