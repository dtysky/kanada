"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 17/1/6
 * Description: Rotate an image by given angle and anchor.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function rotate(angle, anchor, background) {
    if (anchor === void 0) { anchor = [0, 0]; }
    return base_1.default(background, function () { return ({
        anchorX: ~~anchor[0],
        anchorY: ~~anchor[1],
        sina: Math.sin(angle),
        cosa: Math.cos(angle)
    }); }, function (newX, newY, args) {
        var anchorX = args.anchorX, anchorY = args.anchorY, sina = args.sina, cosa = args.cosa;
        var tmpX = newX - anchorX;
        var tmpY = newY - anchorY;
        return {
            oldX: ~~(Math.round(tmpX * cosa) + Math.round(tmpY * sina) + anchorX),
            oldY: ~~(Math.round(-tmpX * sina) + Math.round(tmpY * cosa) + anchorY)
        };
    });
}
exports.rotate = rotate;
