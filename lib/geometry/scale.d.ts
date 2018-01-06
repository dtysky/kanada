/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Scale an image by given factors.
 */
import { ImageCore } from '../core';
import { TPosition, TPixel } from '../constants';
export declare function scale(factors: TPosition, background?: TPixel): (image: ImageCore) => ImageCore;
