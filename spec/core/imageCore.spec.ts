/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description:
 */

import {ImageCore, Exceptions} from '../../src/core/index';

describe('ImageCore', () => {
    it('constructor, all member variables will be initialized', () => {
        let image = new ImageCore();
        expect(image.mode).toEqual('RGBA');
        expect(image.size).toEqual({width: 0, height: 0});
        expect(image.data).toEqual(new Uint8ClampedArray([]));
        image = new ImageCore('L');
        expect(image.mode).toEqual('L');
    });

    describe('fromUrl, getting image data from url: ', () => {
        it ('error with type', () => {
            const image = new ImageCore('L');
            expect(image.fromUrl('')).toThrow(new Exceptions.ImageModeError('L', 'RGB', 'RGBA'));
        });
    });

});
