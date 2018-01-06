"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description: Bits cut.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var allowMode = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L', 'CMYK'];
var genMask = function (low, high) {
    var s = '';
    for (var i = 0; i <= high; i += 1) {
        s = (i < low ? '0' : '1') + s;
    }
    return parseInt(s, 2);
};
exports.bitsCut = function (lowBit, highBit) { return function (image) {
    if (allowMode.indexOf(image.mode) < 0) {
        throw new ((_a = core_1.Exceptions.ColorSpaceError).bind.apply(_a, [void 0, 'the mode of image to be bitsCut', image.mode].concat(allowMode)))();
    }
    var _b = image.region, left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
    var _c = image.size, width = _c[0], height = _c[1];
    highBit = highBit || 7;
    var mask = genMask(lowBit, highBit);
    image.modifyData(function (data) {
        for (var y = top; y < bottom; y += 1) {
            for (var x = left; x < right; x += 1) {
                var pos = (x + y * width) << 2;
                data[pos] = data[pos] & mask;
                switch (image.mode) {
                    case 'RGB':
                    case 'RGBA':
                    case 'BGR':
                    case 'BGRA':
                        data[pos + 1] = data[pos + 1] & mask;
                        data[pos + 2] = data[pos + 2] & mask;
                    case 'CMYK':
                        data[pos + 3] = data[pos + 3] & mask;
                        break;
                    default:
                        break;
                }
            }
        }
    });
    return image;
    var _a;
}; };
