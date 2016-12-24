/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: Tests for core/exceptions.
 */

import {Exceptions} from '../../src/core';

describe('Exceptions', () => {
    it('ColorSpaceError', () => {
        const error = new Exceptions.ColorSpaceError('test', 'L', 'RGBA', 'RGB');
        expect(error.name).toEqual('ColorSpaceError');
        // tslint:disable-next-line
        expect(error.message).toEqual("Color space is error, test couldn't be 'L', expect 'RGBA or RGB'.");
    });

    it ('InvalidImagePathError', () => {
        const error = new Exceptions.InvalidImagePathError('test');
        expect(error.name).toEqual('InvalidImagePathError');
        // tslint:disable-next-line
        expect(error.message).toEqual("Image which has path 'test' is invalid, check your url !");
    });

    it ('BufferSizeError', () => {
        const error = new Exceptions.BufferSizeError(100, 200);
        expect(error.name).toEqual('BufferSizeError');
        // tslint:disable-next-line
        expect(error.message).toEqual("Buffer's size is error, expect '200' but current is '100'.");
    });

});
