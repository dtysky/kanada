/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description: Base function for local filter.
 */
import { ImageCore } from '../core';
import { ConvolutionKernel } from './ConvolutionKernel';
export declare const convolutionFilter: (ck: ConvolutionKernel) => (image: ImageCore) => ImageCore;
