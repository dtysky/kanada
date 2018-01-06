/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description: Mask.
 */
import { ImageCore } from '../core';
export declare const mask: (maskImage: ImageCore, front?: ImageCore, reverse?: boolean) => (image: ImageCore) => ImageCore;
