/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: a set of errors.
 */

import {Constants} from '../constants/index';

class BaseError extends Error {
    constructor(public message?: string) {
        super();
        this.name = this.constructor.name;
        this.stack = (new Error()).stack;
        this.message = message;
    }
}

type ColorSpaces = Constants.ColorSpaces;
export class ImageModeError extends BaseError {
    constructor(public currentMode: ColorSpaces, public expectedMode: ColorSpaces) {
        super();
        this.message = `Image's mode is error, expect '${expectedMode}' but current is '${currentMode}'}`;
    }
}
