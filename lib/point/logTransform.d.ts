/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: logarithmic transformation for each channel of pixels.
 */
import { ImageCore } from '../core';
/**
 * Logarithmic transformation, O = times * log(1 + I).
 * @param image {ImageCore}
 * @param times {number[]}
 * @returns {ImageCore}
 */
export declare const logTransform: (times: number | number[]) => (image: ImageCore) => ImageCore;
