/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Dec 2017
 * Description: Crop an image by given TEdge.
 */
import { ImageCore } from '../core';
import { TPixel, TRegion } from '../constants';
export declare function crop(region: TRegion, background?: TPixel): (image: ImageCore) => ImageCore;
