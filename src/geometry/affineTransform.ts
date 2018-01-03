/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description: Affine transform.
 */

import {ImageCore} from '../core';
import {TPosition, TPixel, TCoord} from '../constants';
import geometryBaseOperate from './base';

export function affineTransform (
    aux: TCoord,
    auy: TCoord,
    au: TCoord,
    avx: TCoord,
    avy: TCoord,
    av: TCoord,
    background?: TPixel
) {
    return geometryBaseOperate(
        background,
        () => ({
            ax: (auy * av - au * avy) / (aux * avy - auy * avx),
            axu: avy / (aux * avy - auy * avx),
            axv: -auy / (aux * avy - auy * avx),
            ay: (-aux * av + au * avx) / (aux * avy - auy * avx),
            ayu: -avx / (aux * avy - auy * avx),
            ayv: aux / (aux * avy - auy * avx)
        }),
        (newX: number, newY: number, args: any) => {
            const {ax, axu, axv, ay, ayu, ayv} = args;
            return {
                oldX: ~~(Math.round(axu * newX + axv * newY + ax)),
                oldY: ~~(Math.round(ayu * newX + ayv * newY + ay))
            };
        }
    );
}
