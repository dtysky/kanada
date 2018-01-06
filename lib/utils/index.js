"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
exports.changeRegion = function (region) { return function (image) {
    image.region = region;
    return image;
}; };
exports.clone = function (image) {
    var im = new core_1.ImageCore();
    im.copy(image);
    return im;
};
