"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function translate(offset, background) {
    return base_1.default(background, function () { return ({
        offX: ~~offset[0],
        offY: ~~offset[1]
    }); }, function (newX, newY, args) { return ({
        oldX: newX - args.offX,
        oldY: newY - args.offY
    }); });
}
exports.translate = translate;
