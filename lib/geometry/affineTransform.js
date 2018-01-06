"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description: Affine transform.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function affineTransform(aux, auy, au, avx, avy, av, background) {
    return base_1.default(background, function () { return ({
        ax: (auy * av - au * avy) / (aux * avy - auy * avx),
        axu: avy / (aux * avy - auy * avx),
        axv: -auy / (aux * avy - auy * avx),
        ay: (-aux * av + au * avx) / (aux * avy - auy * avx),
        ayu: -avx / (aux * avy - auy * avx),
        ayv: aux / (aux * avy - auy * avx)
    }); }, function (newX, newY, args) {
        var ax = args.ax, axu = args.axu, axv = args.axv, ay = args.ay, ayu = args.ayu, ayv = args.ayv;
        return {
            oldX: ~~(Math.round(axu * newX + axv * newY + ax)),
            oldY: ~~(Math.round(ayu * newX + ayv * newY + ay))
        };
    });
}
exports.affineTransform = affineTransform;
