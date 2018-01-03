/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Scale an image by given factors.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';
import geometryBaseOperate from './base';

export function scale (
    factors: TPosition,
    background?: TPixel
) {
    return geometryBaseOperate(
        background,
        () => ({
            sX: factors[0],
            sY: factors[1]
        }),
        (newX: number, newY: number, args: any) => ({
            oldX: ~~(newX / args.sX),
            oldY: ~~(newY / args.sY)
        })
    );
}
