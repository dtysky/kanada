"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (background, prepare, calculate) {
    if (background === void 0) { background = [0, 0, 0, 0]; }
    return function (image) {
        image.modifyData(function (data, size, region) {
            var originData = data.slice(0);
            var width = size[0], height = size[1];
            var left = region[0], top = region[1], right = region[2], bottom = region[3];
            var args = prepare();
            // note: why not newY in (left..right) ?
            // For performance, just have some tests.
            for (var newY = 0; newY < height; newY += 1) {
                for (var newX = 0; newX < width; newX += 1) {
                    if (newX < left || newX > right || newY < top || newY > bottom) {
                        continue;
                    }
                    var newPos = (newY * width + newX) << 2;
                    var _a = calculate(newX, newY, args, image), oldX = _a.oldX, oldY = _a.oldY;
                    if (oldX < left || oldX > right || oldY < top || oldY > bottom) {
                        data[newPos] = background[0];
                        if (image.mode !== 'L' && image.mode !== 'B') {
                            data[newPos + 1] = background[1];
                            data[newPos + 2] = background[2];
                        }
                        data[newPos + 3] = background[3] || 1;
                        continue;
                    }
                    var oldPos = (oldY * width + oldX) << 2;
                    data[newPos] = originData[oldPos];
                    if (image.mode !== 'L' && image.mode !== 'B') {
                        data[newPos + 1] = originData[oldPos + 1];
                        data[newPos + 2] = originData[oldPos + 2];
                    }
                    data[newPos + 3] = originData[oldPos + 3];
                }
            }
        });
        return image;
    };
};
