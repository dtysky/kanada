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

    fdescribe('fromUrl, getting image data from url:', () => {
        it ('failed with type', done => {
            const image = new ImageCore('L');
            image.fromUrl('')
                .catch(err => {
                    expect(err.name).toEqual('ImageModeError');
                    done();
                });
        });
        it ('failed with path', done => {
            const image = new ImageCore();
            image.fromUrl('')
                .catch(err => {
                    expect(err.name).toEqual('InvalidImagePathError');
                    done();
                });
        });
        it('successful', done => {
            const image = new ImageCore();
            image.fromUrl('/base/testImages/rgba.png')
                .then(img => {
                    expect(img.size).toEqual({width: 800, height: 800});
                    done();
                });
        });
    });

});
