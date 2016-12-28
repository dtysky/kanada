/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: sime useful helper fuctions for testing.
 */

import {TPixel, TImageSize, TBuffer} from '../src/constants';

export function genSamePointsBuffer(
    size: TImageSize,
    pixel: TPixel
): TBuffer {
    const pointsCount = size[0] * size[1] * 4;
    const buffer = new Uint8ClampedArray(pointsCount);
    for (let i = 0; i < pointsCount; i += 4) {
        buffer.set(new Uint8ClampedArray(pixel), i);
    }
    return buffer;
}

function getRndColor() {
    const result = new Uint8ClampedArray(4);
    crypto.getRandomValues(result);
    return `rgba(${result.join(',')})`;
}

export function genRandomPointsContext(
    size: TImageSize
): CanvasRenderingContext2D {
    const canvas = document.createElement('canvas');
    canvas.width = size[0];
    canvas.height = size[1];
    const context = canvas.getContext('2d');
    for (let y = 0; y < size[1]; y += 1) {
        for (let x = 0; x < size[0]; x += 1) {
            context.fillStyle = getRndColor();
            context.fillRect(x, y, 1, 1);
        }
    }
    return context;
}

export function getBufferFromContext(
    context: CanvasRenderingContext2D
): TBuffer {
    return new Uint8ClampedArray(context.getImageData(0, 0, 20, 20).data);
}
