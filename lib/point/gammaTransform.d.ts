/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: gamma transformation for each channel of pixels.
 */
import { ImageCore } from '../core';
/**
 * Logarithmic transformation, O = times * I ^ gammas.
 * @param image {ImageCore}
 * @param times {number[]}
 * @param gammas {number[]}
 * @returns {ImageCore}
 */
export declare const gammaTransform: (times: number | number[], gammas: number | number[]) => (image: ImageCore) => ImageCore;
