/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/21
 * Description: converting image from a color space to another color space.
 */
import { ImageCore } from '../core';
import { TColorSpace } from '../constants';
export declare const colorSpaceConvert: (dstMode: TColorSpace) => (image: ImageCore) => ImageCore;
