/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/31
 * Description: moving the origin of image, this method equals to `CanvasRenderingContext2D.translate`.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';
import geometryBaseOperate from './base';

export function translate (
    offset: TPosition,
    background?: TPixel
) {
    return geometryBaseOperate(
        background,
        () => ({
            offX: ~~offset[0],
            offY: ~~offset[1]
        }),
        (newX: number, newY: number, args: any) => ({
            oldX: newX - args.offX,
            oldY: newY - args.offY
        })
    );
}
