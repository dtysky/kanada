/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/31
 * Description: moving the origin of image, this method equals to `CanvasRenderingContext2D.translate`.
 */
import { ImageCore } from '../core';
import { TPosition, TPixel } from '../constants';
export declare function translate(offset: TPosition, background?: TPixel): (image: ImageCore) => ImageCore;
