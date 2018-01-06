"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: constants variables.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Collection of color spaces.
 */
var EColorSpaces;
(function (EColorSpaces) {
    EColorSpaces["RGB"] = "RGB";
    EColorSpaces["BGR"] = "BGR";
    EColorSpaces["RGBA"] = "RGBA";
    EColorSpaces["BGRA"] = "BGRA";
    EColorSpaces["L"] = "L";
    EColorSpaces["B"] = "B";
    EColorSpaces["CMYK"] = "CMYK";
    EColorSpaces["HSL"] = "HSL";
    EColorSpaces["HSV"] = "HSV";
})(EColorSpaces = exports.EColorSpaces || (exports.EColorSpaces = {}));
/**
 * Collection of color spaces (Array).
 */
exports.COLOR_SPACES = Object.keys(EColorSpaces).filter(function (color) { return !(parseInt(color, 10) >= 0); });
/**
 * Bytes per pixel in different color spaces.
 */
exports.PIXEL_SIZE = {
    RGB: 3,
    RGBA: 4,
    BGR: 3,
    BGRA: 4,
    L: 1,
    B: 1,
    CMYK: 4,
    HSL: 3,
    HSV: 3
};
/**
 * The max number for each channel in different color spaces.
 */
exports.COLOR_MAX = {
    RGB: [255, 255, 255],
    RGBA: [255, 255, 255, 255],
    BGR: [255, 255, 255],
    BGRA: [255, 255, 255, 255],
    L: [255],
    B: [255],
    // normalize the range from 0 ~ 1 -> 0 ~ 255
    CMYK: [255, 255, 255, 255],
    // normalize the hue from 0 ~ 360 -> 0 ~ 255, s and l should equal to r g b
    HSL: [240, 255, 255],
    // normalize the hue from 0 ~ 360 -> 0 ~ 255, s and l should equal to r g b
    HSV: [240, 255, 255]
};
/**
 * Color Transformations.
 */
var EColorTrans;
(function (EColorTrans) {
    EColorTrans[EColorTrans["Linear"] = 0] = "Linear";
    EColorTrans[EColorTrans["Log"] = 1] = "Log";
    EColorTrans[EColorTrans["Gamma"] = 2] = "Gamma";
})(EColorTrans = exports.EColorTrans || (exports.EColorTrans = {}));
/**
 * Modes of clip transformation.
 */
var EClipModes;
(function (EClipModes) {
    EClipModes[EClipModes["ARC"] = 0] = "ARC";
    EClipModes[EClipModes["ELLIPSE"] = 1] = "ELLIPSE";
    EClipModes[EClipModes["RECT"] = 2] = "RECT";
})(EClipModes = exports.EClipModes || (exports.EClipModes = {}));
/**
 * Collection of clip transformations (Array).
 */
exports.CLIP_MODES = Object.keys(EClipModes).filter(function (mode) { return !(parseInt(mode, 10) >= 0); });
