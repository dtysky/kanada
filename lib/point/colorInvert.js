"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: reversal color of image.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
exports.colorInvert = function () { return function (image) {
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            var _c = constants_1.COLOR_MAX[image.mode], max1_1 = _c[0], max2_1 = _c[1], max3_1 = _c[2];
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = max1_1 - data[pos];
                        data[pos + 1] = max2_1 - data[pos + 1];
                        data[pos + 2] = max3_1 - data[pos + 2];
                    }
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            var max1_2 = constants_1.COLOR_MAX[image.mode][0];
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = max1_2 - data[pos];
                    }
                }
            });
            break;
        }
        case 'CMYK': {
            var _d = constants_1.COLOR_MAX[image.mode], max1_3 = _d[0], max2_2 = _d[1], max3_2 = _d[2], max4_1 = _d[3];
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = max1_3 - data[pos];
                        data[pos + 1] = max2_2 - data[pos + 1];
                        data[pos + 2] = max3_2 - data[pos + 2];
                        data[pos + 3] = max4_1 - data[pos + 3];
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
