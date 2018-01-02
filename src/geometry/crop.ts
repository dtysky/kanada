/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Crop an image by given TEdge.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel, TEdge} from '../constants';
import geometryBaseOperate from './base';

export function crop (
    edge: TEdge,
    background?: TPixel
) {
    return geometryBaseOperate(
        edge,
        background,
        (attributes: any) => ({
            left: attributes[0],
            top: attributes[1],
            right: attributes[2],
            bottom: attributes[3]
        }),
        (newX: number, newY: number, args: any) => ({
            oldX: newX > args.right || newX < args.left ? -1 : newX,
            oldY: newY > args.bottom || newY < args.top ? -1 : newY
        })
    );
}
