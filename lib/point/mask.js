"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description: Mask.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var constants_1 = require("../constants");
var allowMode = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L'];
var defaultFg = (new core_1.ImageCore()).fromColor([255, 255, 255, 1]);
// resColor = color * (1 - factor) + fgColor * factor
// factor = maskColor / maskMax
exports.mask = function (maskImage, front, reverse) {
    if (front === void 0) { front = defaultFg; }
    if (reverse === void 0) { reverse = false; }
    return function (image) {
        if (allowMode.indexOf(image.mode) < 0) {
            throw new ((_a = core_1.Exceptions.ColorSpaceError).bind.apply(_a, [void 0, 'the mode of image to apply mask', image.mode].concat(allowMode)))();
        }
        var _b = image.region, left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
        var _c = image.size, width = _c[0], height = _c[1];
        var regionWidth = (right - left);
        var regionHeight = (bottom - top);
        var _d = maskImage.size, maskWidth = _d[0], maskHeight = _d[1];
        var scaleMaskX = maskWidth / regionWidth;
        var scaleMaskY = maskHeight / regionHeight;
        var _e = front.size, fgWidth = _e[0], fgHeight = _e[1];
        var scaleFgX = fgWidth / regionWidth;
        var scaleFgY = fgHeight / regionHeight;
        var data = image.imageData.data;
        var fgData = front.imageData.data;
        var maskData = maskImage.imageData.data;
        var maskMax = constants_1.COLOR_MAX['RGBA'][0];
        var opt = function (color, factor, fgColor) {
            if (reverse) {
                factor = 1 - factor;
            }
            return color * (1 - factor) + fgColor * factor;
        };
        image.modifyData(function () {
            for (var y = top; y < bottom; y += 1) {
                for (var x = left; x < right; x += 1) {
                    if (x < 0 || x > width || y < 0 || y > bottom) {
                        continue;
                    }
                    var regionX = x - left;
                    var regionY = y - top;
                    var pos = (x + y * width) << 2;
                    var maskPos = (~~(regionX * scaleMaskX) + ~~(regionY * scaleMaskY) * maskWidth) * 4;
                    var fgPos = (~~(regionX * scaleFgX) + ~~(regionY * scaleFgY) * fgWidth) * 4;
                    // image used as mask must be 'L'
                    var factor = maskData[maskPos] / maskMax;
                    data[pos] = opt(data[pos], factor, fgData[fgPos]);
                    switch (image.mode) {
                        case 'RGB':
                        case 'RGBA':
                        case 'BGR':
                        case 'BGRA': {
                            data[pos + 1] = opt(data[pos + 1], factor, fgData[fgPos + 1]);
                            data[pos + 2] = opt(data[pos + 2], factor, fgData[fgPos + 2]);
                            break;
                        }
                        default:
                            break;
                    }
                    data[pos + 3] = opt(data[pos + 3], factor, fgData[fgPos + 3]);
                }
            }
        });
        return image;
        var _a;
    };
};
