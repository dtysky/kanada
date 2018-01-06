"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2 Jan 2018
 * Description: contrast stretch.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var constants_1 = require("../constants");
var allowMode = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L'];
exports.contrastStretch = function (r1, s1, r2, s2) { return function (image) {
    if (allowMode.indexOf(image.mode) < 0) {
        throw new ((_a = core_1.Exceptions.ColorSpaceError).bind.apply(_a, [void 0, 'the mode of image to be contrastStretch', image.mode].concat(allowMode)))();
    }
    var _b = image.region, left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
    var _c = image.size, width = _c[0], height = _c[1];
    var max = constants_1.COLOR_MAX[image.mode][0];
    var k1 = s1 / r1;
    var km1 = (max - s2) / (max - r2);
    var k21 = (s2 - s1) / (r2 - r1);
    var opt = function (channel) {
        var res = 0;
        if (channel < r1) {
            res = channel * k1;
        }
        else if (channel < r2) {
            res = channel * km1 + s2;
        }
        else {
            res = channel * k21 + s1;
        }
        return res;
    };
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA': {
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = opt(data[pos]);
                        data[pos + 1] = opt(data[pos + 1]);
                        data[pos + 2] = opt(data[pos + 2]);
                    }
                }
            });
            break;
        }
        case 'L': {
            image.modifyData(function (data) {
                for (var y = top; y < bottom; y += 1) {
                    for (var x = left; x < right; x += 1) {
                        var pos = (x + y * width) << 2;
                        data[pos] = opt(data[pos]);
                    }
                }
            });
            break;
        }
        default:
            break;
    }
    return image;
    var _a;
}; };
