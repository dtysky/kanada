/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: a set of errors.
 */

import {TColorSpace, TColorTrans} from '../constants';

export namespace Exceptions {
    class BaseError extends Error {
        constructor(
            name: string = 'BaseError',
            message: string
        ) {
            super();
            this.name = name;
            this.stack = (new Error()).stack;
            this.message = message;
        }
    }

    export class ColorSpaceError extends BaseError {
        constructor(
            paramName: string,
            currentSpace: TColorSpace,
            ...expectedSpace: TColorSpace[]
        ) {
            super(
                'ColorSpaceError',
                `Color space is error, ${paramName} couldn't be '${currentSpace}', expect '${expectedSpace.join(' or ')}'.`
            );
        }
    }

    export class InvalidImagePathError extends BaseError {
        constructor(
            path: string
        ) {
            super('InvalidImagePathError', `Image which has path '${path}' is invalid, check your url !`);
        }
    }

    export class BufferSizeError extends BaseError {
        constructor(
            currentSize: number,
            expectedSize: number
        ) {
            super(
                'BufferSizeError',
                `Buffer's size is error, expect '${expectedSize}' but current is '${currentSize}'.`
            );
        }
    }

    export class ColorTransModeError extends BaseError {
        constructor(
            paramName: string,
            currentMode: TColorTrans,
            ...expectedMode: TColorTrans[]
        ) {
            super(
                'TransformModeError',
                `Transformation's mode is error, ${paramName} couldn't be '${currentMode}', expect '${expectedMode.join(' or ')}'.`
            );
        }
    }
}
