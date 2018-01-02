/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 25 Dec 2017
 * Description: Blueprint for geometry operations.
 */
import {ImageCore} from '../core';
import {TPosition, TPixel} from '../constants';

export default (
  attributes: any,
  background: TPixel = [0, 0, 0, 0],
  prepare: (attributes: any) => any,
  calculate: (newX: number, newY: number, args: any) => {oldX: number, oldY: number}
) => (image: ImageCore) => {
    image.modifyData((data, size) => {
        const originData = data.slice(0);
        const [width, height] = size;
        const args = prepare(attributes);
        for (let newY = 0; newY < height; newY += 1) {
            for (let newX = 0; newX < width; newX += 1) {
                const newPos = (newY * width + newX) * 4;
                const {oldX, oldY} = calculate(newX, newY, args);
                if (oldX < 0 || oldX > width || oldY < 0 || oldY > height) {
                    data[newPos] = background[0];
                    if (image.mode !== 'L' && image.mode !== 'B') {
                        data[newPos + 1] = background[1];
                        data[newPos + 2] = background[2];
                    }
                    data[newPos + 3] = background[3] || 1;
                    continue;
                }
                const oldPos = (oldY * width + oldX) * 4;
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
