"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description: Base function for sort filter.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
function genWindow(size) {
    var win = new Array(size * size);
    return win;
}
exports.rankFilter = function (size, rank) { return function (image) {
    var length = size * size;
    if (length < rank) {
        throw new core_1.Exceptions.SizeError('Rank', rank, "less than window length: " + length);
    }
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    var hsize = size >> 1;
    var channels = 1;
    var windows = [genWindow(size), genWindow(size), genWindow(size), genWindow(size)];
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
        case 'BGR':
        case 'BGRA':
        case 'HSL':
        case 'HSV': {
            channels = 3;
            break;
        }
        case 'CMYK': {
            channels = 4;
            break;
        }
        default:
            break;
    }
    image.modifyData(function (data) {
        for (var y = top; y < bottom; y += 1) {
            for (var x = left; x < right; x += 1) {
                var l = x - hsize;
                var r = x + hsize;
                var t = y - hsize;
                var b = y + hsize;
                var posW = 0;
                for (var wpy = t; wpy <= b; wpy += 1) {
                    for (var wpx = l; wpx <= r; wpx += 1) {
                        if (!(wpx < 0 || wpx > width || wpy < 0 || wpy > height)) {
                            var posWP = (wpx + wpy * width) * 4;
                            windows[0][posW] = data[posWP];
                            if (channels > 2) {
                                windows[1][posW] = data[posWP + 1];
                                windows[2][posW] = data[posWP + 2];
                            }
                            if (channels > 3) {
                                windows[3][posW] = data[posWP + 3];
                            }
                        }
                        else {
                            windows[0][posW] = 0;
                            if (channels > 2) {
                                windows[1][posW] = 0;
                                windows[2][posW] = 0;
                            }
                            if (channels > 3) {
                                windows[3][posW] = 0;
                            }
                        }
                        posW += 1;
                    }
                }
                var pos = (x + y * width) * 4;
                data[pos] = windows[0].sort()[rank];
                if (channels > 2) {
                    data[pos + 1] = windows[1].sort()[rank];
                    data[pos + 2] = windows[2].sort()[rank];
                }
                if (channels > 3) {
                    data[pos + 3] = windows[3].sort()[rank];
                }
            }
        }
    });
    return image;
}; };
