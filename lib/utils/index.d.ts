/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */
import { ImageCore } from '../core';
export declare const changeRegion: (region: [number, number, number, number]) => (image: ImageCore) => ImageCore;
export declare const clone: (image: ImageCore) => ImageCore;
