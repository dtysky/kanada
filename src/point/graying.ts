/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: graying a image.
 */

import {TColorSpaces, Environments} from '../constants/index';
import {Exceptions, ImageCore} from '../core/index';

export function graying(image: ImageCore) {
    if (image.mode !== <TColorSpaces>'RGB' || image.mode !== <TColorSpaces>'RGBA') {
        throw new Exceptions.ImageModeError(image.mode, 'RGB', 'RGBA');
    }
}
