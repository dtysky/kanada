/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: convert an gray image to binary image with given global threshold.
 */
import {Exceptions, ImageCore} from '../core';
import {TChannel, COLOR_MAX} from '../constants';

export const globalThreshold = (
    th: TChannel,
    th2?: TChannel
) => (image: ImageCore) => {
    const size = image.data.length;
    const max = COLOR_MAX[image.mode][0];
    if (th2) {
        image.modifyData(data => {
            for (let pos = 0; pos < size; pos += 4) {
                data[pos] = data[pos] <= th || data[pos] >= th2 ? 0 : max;
                if (image.mode !== 'L' && image.mode !== 'B') {
                    data[pos + 1] = data[pos + 1] <= th || data[pos + 1] >= th2 ? 0 : max;
                    data[pos + 2] = data[pos + 2] <= th || data[pos + 2] >= th2 ? 0 : max;
                }
            }
        });
    } else {
        image.modifyData(data => {
            for (let pos = 0; pos < size; pos += 4) {
                data[pos] = data[pos] >= th ? max : 0;
                if (image.mode !== 'L' && image.mode !== 'B') {
                    data[pos + 1] = data[pos + 1] >= th ? max : 0;
                    data[pos + 2] = data[pos + 2] >= th ? max : 0;
                }
            }
        });
    }
    if (image.mode === 'L') {
        image.changeMode('B');
    }
    return image;
};
