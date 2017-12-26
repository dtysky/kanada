/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 17/1/6
 * Description: Rotate an image by given angle and anchor.
 */

import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';
import geometryBaseOperate from './base';

export default function rotate(
    image: ImageCore,
    angle: number,
    anchor: TPosition = [0, 0],
    background: TPixel = [0, 0, 0, 0]
): ImageCore {
    return geometryBaseOperate(
        image,
        {anchor, angle},
        background,
        (attributes: any) => ({
            anchorX: ~~attributes.anchor[0],
            anchorY: ~~attributes.anchor[1],
            sina: Math.sin(angle),
            cosa: Math.cos(angle)
        }),
        (newX: number, newY: number, args: any) =>{
            const {anchorX, anchorY, sina, cosa} = args;
            const tmpX = newX - anchorX;
            const tmpY = newY - anchorY;
            return {
                oldX: ~~(Math.round(tmpX * cosa) + Math.round(tmpY * sina) + anchorX),
                oldY: ~~(Math.round(-tmpX * sina) + Math.round(tmpY * cosa) + anchorY)
            };
        }
    );
}
