/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: sime useful helper fuctions for testing.
 */

import {TPixel, TImageSize, TBuffer} from '../src/constants';

export function genSamePointsBuffer(size: TImageSize, pixel: TPixel): TBuffer {
    const pointsCount = size[0] * size[1] * 4;
    const buffer = new Uint8ClampedArray(pointsCount);
    for (let i = 0; i < pointsCount; i += 4) {
        buffer.set(new Uint8ClampedArray(pixel), i);
    }
    return buffer;
}
