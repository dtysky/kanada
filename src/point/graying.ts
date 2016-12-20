/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: graying a image.
 */

import {TColorSpaces, Environments} from '../constants';
import {Exceptions, ImageCore} from '../core';

export function graying(image: ImageCore) {
    if (image.mode !== 'RGBA' && image.mode !== 'RGB' && image.mode !== 'BGR' && image.mode !== 'BGRA') {
        throw new Exceptions.ImageModeError(image.mode, 'RGB', 'RGBA');
    }
}
