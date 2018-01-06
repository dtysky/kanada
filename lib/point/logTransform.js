"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: logarithmic transformation for each channel of pixels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var constants_1 = require("../constants");
function checkSize(times, expectSize) {
    if (times.length !== expectSize) {
        throw new core_1.Exceptions.ArraySizeError('LogTransform times', times.length, expectSize);
    }
}
function getBorder(max, times) {
    return Math.pow(2, max / times) - 1;
}
/**
 * Logarithmic transformation, O = times * log(1 + I).
 * @param image {ImageCore}
 * @param times {number[]}
 * @returns {ImageCore}
 */
exports.logTransform = function (times) { return function (image) {
    times = typeof times === 'number' ? [times, times, times] : times;
    var size = image.data.length;
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            checkSize(times, 3);
            var _a = constants_1.COLOR_MAX[image.mode], max1_1 = _a[0], max2_1 = _a[1], max3_1 = _a[2];
            var t1_1 = times[0], t2_1 = times[1], t3_1 = times[2];
            var border1_1 = getBorder(max1_1, t1_1);
            var border2_1 = getBorder(max2_1, t2_1);
            var border3_1 = getBorder(max3_1, t3_1);
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1_1 ? max1_1 : ~~(t1_1 * Math.log2(1 + data[pos]));
                    data[pos + 1] = data[pos + 1] > border2_1 ? max2_1 : ~~(t2_1 * Math.log2(1 + data[pos + 1]));
                    data[pos + 2] = data[pos + 2] > border3_1 ? max3_1 : ~~(t3_1 * Math.log2(1 + data[pos + 2]));
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            checkSize(times, 1);
            var max1_2 = constants_1.COLOR_MAX[image.mode][0];
            var t1_2 = times[0];
            var border1_2 = getBorder(max1_2, t1_2);
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1_2 ? max1_2 : ~~(t1_2 * Math.log2(1 + data[pos]));
                }
            });
            break;
        }
        case 'CMYK': {
            checkSize(times, 4);
            var _b = constants_1.COLOR_MAX[image.mode], max1_3 = _b[0], max2_2 = _b[1], max3_2 = _b[2], max4_1 = _b[3];
            var t1_3 = times[0], t2_2 = times[1], t3_2 = times[2], t4_1 = times[3];
            var border1_3 = getBorder(max1_3, t1_3);
            var border2_2 = getBorder(max2_2, t2_2);
            var border3_2 = getBorder(max3_2, t3_2);
            var border4_1 = getBorder(max4_1, t4_1);
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1_3 ? max1_3 : ~~(t1_3 * Math.log2(1 + data[pos]));
                    data[pos + 1] = data[pos + 1] > border2_2 ? max2_2 : ~~(t2_2 * Math.log2(1 + data[pos + 1]));
                    data[pos + 2] = data[pos + 2] > border3_2 ? max3_2 : ~~(t3_2 * Math.log2(1 + data[pos + 2]));
                    data[pos + 3] = data[pos + 3] > border4_1 ? max4_1 : ~~(t4_1 * Math.log2(1 + data[pos + 3]));
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
}; };
