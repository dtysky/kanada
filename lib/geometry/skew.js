"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function skew(factors, background) {
    return base_1.default(background, function () { return ({
        fX: factors[0],
        fY: factors[1]
    }); }, function (newX, newY, args) { return ({
        oldX: ~~(newX / args.fX) - newY,
        oldY: ~~(newY / args.fY) - newX
    }); });
}
exports.skew = skew;
