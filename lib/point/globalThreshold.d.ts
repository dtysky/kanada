/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: convert an gray image to binary image with given global threshold.
 */
import { ImageCore } from '../core';
export declare const globalThreshold: (th: number, th2?: number) => (image: ImageCore) => ImageCore;
