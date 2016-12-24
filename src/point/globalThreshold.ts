/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: convert an gray image to binary image with given global threshold.
 */

import {Exceptions, ImageCore} from '../core';
import {TChannel, COLOR_MAX} from '../constants';

export function globalThreshold(
    image: ImageCore,
    th: TChannel
): ImageCore {
    if (image.mode !== 'L') {
        throw new Exceptions.ColorSpaceError('the mode of image to be converted to binary image', image.mode, 'L');
    }
    const size = image.data.length;
    const max = COLOR_MAX[image.mode][0];
    image.modifyData(data => {
        for (let pos = 0; pos < size; pos += 4) {
            data[pos] = data[pos] >= th ? max : 0;
        }
    });
    return image.changeMode('B');
}
