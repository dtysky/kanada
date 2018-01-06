"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function scale(factors, background) {
    return base_1.default(background, function () { return ({
        sX: factors[0],
        sY: factors[1]
    }); }, function (newX, newY, args) { return ({
        oldX: ~~(newX / args.sX),
        oldY: ~~(newY / args.sY)
    }); });
}
exports.scale = scale;
