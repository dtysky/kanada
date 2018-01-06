/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 25 Dec 2017
 * Description: Blueprint for geometry operations.
 */
import { ImageCore } from '../core';
import { TPixel } from '../constants';
declare const _default: (background: TPixel, prepare: () => any, calculate: (newX: number, newY: number, args: any, image?: ImageCore) => {
    oldX: number;
    oldY: number;
}) => (image: ImageCore) => ImageCore;
export default _default;
