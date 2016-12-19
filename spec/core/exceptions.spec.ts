/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: Tests for exceptions.
 */

import {Exceptions} from '../../src/core/index';

describe('Exceptions', () => {
    it('ImageModeError', () => {
        const error = new Exceptions.ImageModeError('L', 'RGBA', 'RGB');
        expect(error.name).toEqual('ImageModeError');
        // tslint:disable-next-line
        expect(error.message).toEqual("Image's mode is error, expect 'RGBA or RGB' but current is 'L'.");
    });

    it ('InvalidImagePathError', () => {
        const error = new Exceptions.InvalidImagePathError('test');
        expect(error.name).toEqual('InvalidImagePathError');
        // tslint:disable-next-line
        expect(error.message).toEqual("Image which has path 'test' is invalid, check your url !");
    });

});
