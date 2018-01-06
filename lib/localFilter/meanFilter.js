"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 6 Jan 2018
 * Description: Mean filter.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var convolutionFilter_1 = require("./convolutionFilter");
var ConvolutionKernel_1 = require("./ConvolutionKernel");
function meanFilter(size) {
    var length = size * size;
    var ckMatrix = (new Array(size)).fill((new Array(size)).fill(1 / length));
    var ck = new ConvolutionKernel_1.ConvolutionKernel(ckMatrix);
    return convolutionFilter_1.convolutionFilter(ck);
}
exports.meanFilter = meanFilter;
