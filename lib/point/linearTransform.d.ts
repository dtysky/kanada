/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: linear transformation for each channel of pixels.
 */
import { ImageCore } from '../core';
export declare const linearTransform: (gains: number | number[]) => (image: ImageCore) => ImageCore;
