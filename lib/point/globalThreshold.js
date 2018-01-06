"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
exports.globalThreshold = function (th, th2) { return function (image) {
    var _a = image.region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
    var _b = image.size, width = _b[0], height = _b[1];
    var max = constants_1.COLOR_MAX[image.mode][0];
    if (th2) {
        image.modifyData(function (data) {
            for (var y = top; y < bottom; y += 1) {
                for (var x = left; x < right; x += 1) {
                    var pos = (x + y * width) << 2;
                    data[pos] = data[pos] <= th || data[pos] >= th2 ? 0 : max;
                    if (image.mode !== 'L' && image.mode !== 'B') {
                        data[pos + 1] = data[pos + 1] <= th || data[pos + 1] >= th2 ? 0 : max;
                        data[pos + 2] = data[pos + 2] <= th || data[pos + 2] >= th2 ? 0 : max;
                    }
                }
            }
        });
    }
    else {
        image.modifyData(function (data) {
            for (var y = top; y < bottom; y += 1) {
                for (var x = left; x < right; x += 1) {
                    var pos = (x + y * width) << 2;
                    data[pos] = data[pos] >= th ? max : 0;
                    if (image.mode !== 'L' && image.mode !== 'B') {
                        data[pos + 1] = data[pos + 1] >= th ? max : 0;
                        data[pos + 2] = data[pos + 2] >= th ? max : 0;
                    }
                }
            }
        });
    }
    if (image.mode === 'L') {
        image.changeMode('B');
    }
    return image;
}; };
