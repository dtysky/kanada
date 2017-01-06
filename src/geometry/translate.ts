/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/31
 * Description: moving the origin of image, this method equals to `CanvasRenderingContext2D.translate`.
 */

import {ImageCore} from '../core';
import {TPosition} from '../constants';

export function translate(
    image: ImageCore,
    offset: TPosition
): ImageCore {
    image.modifyContext(context => {
        context.translate(offset[0], offset[1]);
    });
    return image;
}
