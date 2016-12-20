/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: a set of errors.
 */

import {TColorSpaces} from '../constants';

export namespace Exceptions {
    class BaseError extends Error {
        constructor(name: string = 'BaseError', message: string) {
            super();
            this.name = name;
            this.stack = (new Error()).stack;
            this.message = message;
        }
    }

    export class ImageModeError extends BaseError {
        constructor(currentMode: TColorSpaces, ...expectedModes: TColorSpaces[]) {
            super(
                'ImageModeError',
                `Image's mode is error, expect '${expectedModes.join(' or ')}' but current is '${currentMode}'.`
            );
        }
    }

    export class InvalidImagePathError extends BaseError {
        constructor(path: string) {
            super('InvalidImagePathError', `Image which has path '${path}' is invalid, check your url !`);
        }
    }

    export class BufferSizeError extends BaseError {
        constructor(currentSize: number, expectedSize: number) {
            super(
                'BufferSizeError',
                `Buffer's size is error, expect '${expectedSize}' but current is '${currentSize}'.`
            );
        }
    }
}
