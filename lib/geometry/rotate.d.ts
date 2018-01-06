/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 17/1/6
 * Description: Rotate an image by given angle and anchor.
 */
import { ImageCore } from '../core';
import { TPosition, TPixel } from '../constants';
export declare function rotate(angle: number, anchor?: TPosition, background?: TPixel): (image: ImageCore) => ImageCore;
