/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description: Affine transform.
 */
import { ImageCore } from '../core';
import { TPixel, TCoord } from '../constants';
export declare function affineTransform(aux: TCoord, auy: TCoord, au: TCoord, avx: TCoord, avy: TCoord, av: TCoord, background?: TPixel): (image: ImageCore) => ImageCore;
