/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Shear an image by given factors.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';
import geometryBaseOperate from './base';

export function skew (
    factors: TPosition,
    background?: TPixel
) {
    return geometryBaseOperate(
        background,
        () => ({
            fX: factors[0],
            fY: factors[1]
        }),
        (newX: number, newY: number, args: any) => ({
            oldX: ~~(newX / args.fX) - newY,
            oldY: ~~(newY / args.fY) - newX
        })
    );
}
