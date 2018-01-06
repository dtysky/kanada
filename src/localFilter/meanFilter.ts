/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 6 Jan 2018
 * Description: Mean filter.
 */

import {ImageCore} from '../core';
import {convolutionFilter} from './convolutionFilter';
import {ConvolutionKernel} from './ConvolutionKernel';

export function meanFilter (
    size: number
) {
    const length = size * size;
    const ckMatrix = (new Array(size)).fill((new Array(size)).fill(1 / length));
    const ck = new ConvolutionKernel(ckMatrix);

    return convolutionFilter(ck);
}
