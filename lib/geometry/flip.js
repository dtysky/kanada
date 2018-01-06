"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function flip(mode) {
    if (mode === void 0) { mode = 'h'; }
    return base_1.default([0, 0, 0, 0], function () { return ({}); }, function (newX, newY, args, image) {
        switch (mode) {
            case 'h':
                return {
                    oldX: image.width - newX,
                    oldY: newY
                };
            case 'v':
                return {
                    oldX: newX,
                    oldY: image.height - newY
                };
            case 'all':
                return {
                    oldX: image.width - newX,
                    oldY: image.height - newY
                };
            default:
                break;
        }
    });
}
exports.flip = flip;
