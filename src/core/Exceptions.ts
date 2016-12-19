/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: a set of errors.
 */

import {TColorSpaces} from '../constants/index';

export namespace Exceptions {
    class BaseError extends Error {
        constructor(public message: string) {
            super();
            // tslint:disable-next-line
            this.name = (<any>this).constructor.name;
            this.stack = (new Error()).stack;
            this.message = message;
        }
    }

    export class ImageModeError extends BaseError {
        constructor(currentMode: TColorSpaces, ...expectedModes: TColorSpaces[]) {
            super(`Image's mode is error, expect '${expectedModes.join(' or ')}' but current is '${currentMode}'.`);
        }
    }

    export class InvalidImagePathError extends BaseError {
        constructor(path: string) {
            super(`Image which has path ${path} is invalid, check your url !`);
        }
    }
}
