"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description:
 */
var core_1 = require("../core");
exports.localThreshold = function (thMap) { return function (image) {
    var thData = thMap;
    if (thMap instanceof core_1.ImageCore) {
        thData = thMap.imageData.data;
    }
    if (thData.length !== image.imageData.data.length) {
        throw new core_1.Exceptions.BufferSizeError(length, image.imageData.data.length);
    }
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    image.modifyData(function (data) {
        for (var y = top; y < bottom; y += 1) {
            for (var x = left; x < right; x += 1) {
                var pos = (x + y * width) * 4;
                data[pos] = data[pos] < thData[pos] ? 0 : 255;
                switch (image.mode) {
                    case 'RGB':
                    case 'RGBA':
                    case 'BGR':
                    case 'BGRA':
                    case 'HSL':
                    case 'HSV':
                        data[pos] = data[pos] < thData[pos] ? 0 : 255;
                        data[pos] = data[pos] < thData[pos] ? 0 : 255;
                        break;
                    case 'CMYK':
                        data[pos + 1] = data[pos + 1] < thData[pos + 1] ? 0 : 255;
                        data[pos + 2] = data[pos + 2] < thData[pos + 2] ? 0 : 255;
                        data[pos + 3] = data[pos + 3] < thData[pos + 3] ? 0 : 255;
                        break;
                    default:
                        break;
                }
            }
        }
    });
    return image;
}; };
