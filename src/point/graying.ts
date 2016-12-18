/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: graying a image.
 */

import {ImageCore} from '../core/index';
import {Errors} from '../core/index';

export function graying(image: ImageCore) {
    if (image.mode() !== 'RGB' || image.mode() !== 'RGBA') {
        throw new Errors.ImageModeError(image.mode(), 'RGB or RGBA');
    }
}
