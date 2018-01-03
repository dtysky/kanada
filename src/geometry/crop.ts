/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Crop an image by given TEdge.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel, TRegion} from '../constants';
import geometryBaseOperate from './base';

export function crop (
    region: TRegion,
    background?: TPixel
) {
    return geometryBaseOperate(
        background,
        () => ({
            left: region[0],
            top: region[1],
            right: region[2],
            bottom: region[3]
        }),
        (newX: number, newY: number, args: any) => ({
            oldX: newX > args.right || newX < args.left ? -1 : newX,
            oldY: newY > args.bottom || newY < args.top ? -1 : newY
        })
    );
}
