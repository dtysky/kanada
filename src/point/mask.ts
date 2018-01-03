/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description: Mask.
 */

import {ImageCore, Exceptions} from '../core';
import {COLOR_MAX, TSize, TChannel, TColorSpace, TCoord} from '../constants';

const allowMode: TColorSpace[] = ['RGBA', 'RGB', 'BGR', 'BGRA', 'L'];
const defaultFg = (new ImageCore()).fromColor([255, 255, 255, 1]);

// resColor = color * (1 - factor) + fgColor * factor
// factor = maskColor / maskMax
export const mask = (
    maskImage: ImageCore,
    front: ImageCore = defaultFg,
    reverse: boolean = false
) => (image: ImageCore) => {
    if (allowMode.indexOf(image.mode) < 0) {
        throw new Exceptions.ColorSpaceError('the mode of image to apply mask', image.mode, ...allowMode);
    }
    const [left, top, right, bottom] = image.region;
    const [width, height] = image.size;
    const regionWidth = (right - left);
    const regionHeight = (bottom - top);

    const [maskWidth, maskHeight] = maskImage.size;
    const scaleMaskX = maskWidth / regionWidth;
    const scaleMaskY = maskHeight / regionHeight;

    const [fgWidth, fgHeight] = front.size;
    const scaleFgX = fgWidth / regionWidth;
    const scaleFgY = fgHeight / regionHeight;

    const data = image.imageData.data;
    const fgData = front.imageData.data;
    const maskData = maskImage.imageData.data;
    const maskMax = COLOR_MAX['RGBA'][0];

    const opt = (color: TChannel, factor: TChannel, fgColor: TChannel) => {
        if (reverse) {
            factor = 1 - factor;
        }
        return color * (1 - factor) + fgColor * factor;
    };

    image.modifyData(() => {
        for (let y = top; y < bottom; y += 1) {
            for (let x = left; x < right; x += 1) {
                const regionX = x - left;
                const regionY = y - top;
                const pos = (x + y * width) << 2;
                const maskPos = (~~(regionX * scaleMaskX) + ~~(regionY * scaleMaskY) * maskWidth) * 4;
                const fgPos = (~~(regionX * scaleFgX) + ~~(regionY * scaleFgY) * fgWidth) * 4;
                // image used as mask must be 'L'
                const factor = maskData[maskPos] / maskMax;

                data[pos] = opt(data[pos], factor, fgData[fgPos]);

                switch (image.mode) {
                    case 'RGB':
                    case 'RGBA':
                    case 'BGR':
                    case 'BGRA': {
                        data[pos + 1] = opt(data[pos + 1], factor, fgData[fgPos + 1]);
                        data[pos + 2] = opt(data[pos + 2], factor, fgData[fgPos + 2]);
                        break;
                    }
                    default:
                        break;
                }

                data[pos + 3] = opt(data[pos + 3], factor, fgData[fgPos + 3]);
            }
        }
    });

    return image;
};
