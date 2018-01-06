"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: linear transformation for each channel of pixels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
exports.linearTransform = function (gains) { return function (image) {
    gains = typeof gains === 'number' ? [gains, gains, gains] : gains;
    var size = image.data.length;
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            var _a = constants_1.COLOR_MAX[image.mode], max1_1 = _a[0], max2_1 = _a[1], max3_1 = _a[2];
            var gain1_1 = gains[0], gain2_1 = gains[1], gain3_1 = gains[2];
            var border1_1 = max1_1 - gain1_1;
            var border2_1 = max2_1 - gain2_1;
            var border3_1 = max3_1 - gain3_1;
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1_1 ? max1_1 : data[pos] + gain1_1;
                    data[pos + 1] = data[pos + 1] > border2_1 ? max2_1 : data[pos + 1] + gain2_1;
                    data[pos + 2] = data[pos + 2] > border3_1 ? max3_1 : data[pos + 2] + gain3_1;
                }
            });
            break;
        }
        case 'L':
        case 'B': {
            var max1_2 = constants_1.COLOR_MAX[image.mode][0];
            var gain1_2 = gains[0];
            var border1_2 = max1_2 - gain1_2;
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1_2 ? max1_2 : data[pos] + gain1_2;
                }
            });
            break;
        }
        case 'CMYK': {
            var _b = constants_1.COLOR_MAX[image.mode], max1_3 = _b[0], max2_2 = _b[1], max3_2 = _b[2], max4_1 = _b[3];
            var gain1_3 = gains[0], gain2_2 = gains[1], gain3_2 = gains[2], gain4_1 = gains[3];
            var border1_3 = max1_3 - gain1_3;
            var border2_2 = max2_2 - gain2_2;
            var border3_2 = max3_2 - gain3_2;
            var border4_1 = max4_1 - gain4_1;
            image.modifyData(function (data) {
                for (var pos = 0; pos < size; pos += 4) {
                    data[pos] = data[pos] > border1_3 ? max1_3 : data[pos] + gain1_3;
                    data[pos + 1] = data[pos + 1] > border2_2 ? max2_2 : data[pos + 1] + gain2_2;
                    data[pos + 2] = data[pos + 2] > border3_2 ? max3_2 : data[pos + 2] + gain3_2;
                    data[pos + 3] = data[pos + 3] > border4_1 ? max4_1 : data[pos + 3] + gain4_1;
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
}; };
