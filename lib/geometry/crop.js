"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function crop(region, background) {
    return base_1.default(background, function () { return ({
        left: region[0],
        top: region[1],
        right: region[2],
        bottom: region[3]
    }); }, function (newX, newY, args) { return ({
        oldX: newX > args.right || newX < args.left ? -1 : newX,
        oldY: newY > args.bottom || newY < args.top ? -1 : newY
    }); });
}
exports.crop = crop;
