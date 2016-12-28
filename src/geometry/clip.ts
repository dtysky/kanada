/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/26
 * Description: clipping an image with given mode and path, this method equals to `CanvasRenderingContext2D.clip`.
 */

import {ImageCore} from '../core';
import {TClipPath, TClipMode} from '../constants';

export function clip(
    image: ImageCore,
    mode: TClipMode,
    path: TClipPath
): ImageCore {
    image.modifyContext(context => {
        context[mode.toLowerCase()].apply(context, path);
        context.clip();
    });
    return image;
}
