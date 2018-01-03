/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 25 Dec 2017
 * Description: Blueprint for geometry operations.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';

export default (
  background: TPixel = [0, 0, 0, 0],
  prepare: () => any,
  calculate: (newX: number, newY: number, args: any) => {oldX: number, oldY: number}
) => (image: ImageCore) => {
    image.modifyData((data, size, region) => {
        const originData = data.slice(0);
        const [width, height] = size;
        const [left, top, right, bottom] = region;
        const args = prepare();
        // note: why not newY in (left..right) ?
        // For performance, just have some tests.
        for (let newY = 0; newY < height; newY += 1) {
            for (let newX = 0; newX < width; newX += 1) {
                if (newX < left || newX > right || newY < top || newY > bottom) {
                    continue;
                }
                const newPos = (newY * width + newX) << 2;
                const {oldX, oldY} = calculate(newX, newY, args);
                if (oldX < left || oldX > right || oldY < top || oldY > bottom) {
                    data[newPos] = background[0];
                    if (image.mode !== 'L' && image.mode !== 'B') {
                        data[newPos + 1] = background[1];
                        data[newPos + 2] = background[2];
                    }
                    data[newPos + 3] = background[3] || 1;
                    continue;
                }
                const oldPos = (oldY * width + oldX) << 2;
                data[newPos] = originData[oldPos];
                if (image.mode !== 'L' && image.mode !== 'B') {
                    data[newPos + 1] = originData[oldPos + 1];
                    data[newPos + 2] = originData[oldPos + 2];
                }
                data[newPos + 3] = originData[oldPos + 3];
            }
        }
    });
    return image;
}
