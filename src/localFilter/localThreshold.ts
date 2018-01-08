/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description:
 */
import {ImageCore, Exceptions, TOperate} from '../core';
import {clone} from '../utils';

export function localThreshold(thMap: ImageCore | Uint8ClampedArray): TOperate;
export function localThreshold(preOperations: TOperate[]): TOperate;
export function localThreshold (arg): TOperate {
    return (image: ImageCore) => {
        let thMap = arg;
        if (arg instanceof Array) {
            thMap = clone(image);
            arg.forEach(opt => thMap.pipe(opt));
            thMap.exec();
        }

        let thData = thMap as Uint8ClampedArray;
        if (thMap instanceof ImageCore) {
            thData = thMap.imageData.data;
        }

        if (thData.length !== image.imageData.data.length) {
            throw new Exceptions.BufferSizeError(thData.length, image.imageData.data.length);
        }

        const [left, top, right, bottom] = image.region;
        const [width, height] = image.size;

        image.modifyData(data => {
            for (let y = top; y < bottom; y += 1) {
                for (let x = left; x < right; x += 1) {
                    const pos = (x + y * width) * 4;
                    data[pos] = data[pos] < thData[pos] ? 0 : 255;
                    switch (image.mode) {
                        case 'RGB':
                        case 'RGBA':
                        case 'BGR':
                        case 'BGRA':
                        case 'HSL':
                        case 'HSV':
                            data[pos] = data[pos] < thData[pos] ? 0 : 255;
                            data[pos] = data[pos] < thData[pos] ? 0 : 255;
                            break;
                        case 'CMYK':
                            data[pos + 1] = data[pos + 1] < thData[pos + 1] ? 0 : 255;
                            data[pos + 2] = data[pos + 2] < thData[pos + 2] ? 0 : 255;
                            data[pos + 3] = data[pos + 3] < thData[pos + 3] ? 0 : 255;
                            break;
                        default:
                            break;
                    }
                }
            }
        });

        return image;
    }
}
