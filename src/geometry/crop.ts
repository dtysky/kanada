/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Crop an image by given border.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';
import geometryBaseOperate from './base';

export default function crop(
    image: ImageCore,
    factors: TPosition,
    background: TPixel = [0, 0, 0, 0]
): ImageCore {
    return geometryBaseOperate(
        image,
        factors,
        background,
        (attributes: any) => ({
            fX: attributes[0],
            fY: attributes[1]
        }),
        (newX: number, newY: number, args: any) => ({
            oldX: ~~(newX / args.fX) - newY,
            oldY: ~~(newY / args.fY) - newX
        })
    );
}
