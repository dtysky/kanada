/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: graying a image.
 */

import {Exceptions, ImageCore} from '../core';

export const grayscale = () => (image: ImageCore) => {
    if (image.mode !== 'RGBA' && image.mode !== 'RGB' && image.mode !== 'BGR' && image.mode !== 'BGRA') {
        throw new Exceptions.ColorSpaceError('the mode of image to be grayscaled', image.mode, 'RGB', 'RGBA');
    }
    const size = image.data.length;
    switch (image.mode) {
        case 'RGB':
        case 'RGBA':
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    // optimization for v8 engine
                    // calculating color in this way could avoid type conversion
                    const pixel = (data[pos] * 4899 >> 14) + (data[pos + 1] * 9617 >> 14) + (data[pos + 2] * 1868 >> 14);
                    data[pos] = pixel;
                    data[pos + 1] = pixel;
                    data[pos + 2] = pixel;
                }
            });
            break;
        case 'BGR':
        case 'BGRA':
            image.modifyData(data => {
                for (let pos = 0; pos < size; pos += 4) {
                    const pixel = (data[pos] * 1868 >> 14) + (data[pos + 1] * 9617 >> 14) + (data[pos + 2] * 4899 >> 14);
                    data[pos] = pixel;
                    data[pos + 1] = pixel;
                    data[pos + 2] = pixel;
                }
            });
            break;
        default:
            break;
    }
    return image.changeMode('L');
}
