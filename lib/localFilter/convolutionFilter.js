"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convolutionFilter = function (ck) { return function (image) {
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    var size = ck.size;
    var hsize = size >> 1;
    var ckMatrix = ck.matrix;
    var channels = 1;
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
                var colors = [0, 0, 0, 0];
                for (var wpy = t; wpy <= b; wpy += 1) {
                    var wy = wpy - t;
                    for (var wpx = l; wpx <= r; wpx += 1) {
                        var wx = wpx - l;
                        if (!(wpx < 0 || wpx > width || wpy < 0 || wpy > height)) {
                            var posWP = (wpx + wpy * width) * 4;
                            // const posW = wx + wy * size;
                            colors[0] += data[posWP] * ckMatrix[wy][wx];
                            if (channels > 2) {
                                colors[1] += data[posWP + 1] * ckMatrix[wy][wx];
                                colors[2] += data[posWP + 2] * ckMatrix[wy][wx];
                            }
                            if (channels > 3) {
                                colors[3] += data[posWP + 3] * ckMatrix[wy][wx];
                            }
                        }
                    }
                }
                var pos = (x + y * width) * 4;
                data[pos] = colors[0];
                if (channels > 2) {
                    data[pos + 1] = colors[1];
                    data[pos + 2] = colors[2];
                }
                if (channels > 3) {
                    data[pos + 3] = colors[3];
                }
            }
        }
    });
    return image;
}; };
