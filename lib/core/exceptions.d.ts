/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: a set of errors.
 */
import { TColorSpace, TSize, TRegion } from '../constants';
export declare namespace Exceptions {
    class BaseError extends Error {
        constructor(name: string, message: string);
    }
    class ColorSpaceError extends BaseError {
        constructor(paramName: string, currentSpace: TColorSpace, ...expectedSpace: TColorSpace[]);
    }
    class InvalidImagePathError extends BaseError {
        constructor(path: string);
    }
    class BufferSizeError extends BaseError {
        constructor(currentSize: TSize, expectedSize: TSize);
    }
    class ArraySizeError extends BaseError {
        constructor(paramName: string, currentSize: TSize, expectedSize: TSize | string);
    }
    class RegionSizeError extends BaseError {
        constructor(paramName: string, current: TRegion, expect: string);
    }
    class SizeError extends BaseError {
        constructor(paramName: string, current: number, expect: string);
    }
}
