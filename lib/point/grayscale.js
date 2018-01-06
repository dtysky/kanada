"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: graying a image.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
exports.grayscale = function () { return function (image) {
    if (image.mode !== 'RGBA' && image.mode !== 'RGB' && image.mode !== 'BGR' && image.mode !== 'BGRA') {
        throw new core_1.Exceptions.ColorSpaceError('the mode of image to be grayscaled', image.mode, 'RGB', 'RGBA');
    }
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) * 4;
                        // optimization for v8 engine
                        // calculating color in this way could avoid type conversion
                        var pixel = (data[pos] * 4899 >> 14) + (data[pos + 1] * 9617 >> 14) + (data[pos + 2] * 1868 >> 14);
                        data[pos] = pixel;
                        data[pos + 1] = pixel;
                        data[pos + 2] = pixel;
                    }
                }
            });
            break;
        case 'BGR':
        case 'BGRA':
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) * 4;
                        var pixel = (data[pos] * 1868 >> 14) + (data[pos + 1] * 9617 >> 14) + (data[pos + 2] * 4899 >> 14);
                        data[pos] = pixel;
                        data[pos + 1] = pixel;
                        data[pos + 2] = pixel;
                    }
                }
            });
            break;
        default:
            break;
    }
    return image.changeMode('L');
}; };
