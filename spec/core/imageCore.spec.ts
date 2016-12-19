/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description:
 */

import {ImageCore, Exceptions} from '../../src/core/index';
import {white20x20, black20x20} from './imageData.testcase';

describe('ImageCore', () => {
    it('constructor, all member variables will be initialized', () => {
        let image = new ImageCore();
        expect(image.mode).toEqual('RGBA');
        expect(image.size).toEqual({width: 0, height: 0});
        expect(image.data).toEqual(new Uint8ClampedArray([]));
        image = new ImageCore('L');
        expect(image.mode).toEqual('L');
    });

    it('fromImage, creating image data from HtmlImageElement', done => {
        const img = new Image();
        img.onload = () => {
            const image = new ImageCore();
            image.fromImage(img);
            expect(image.size).toEqual({width: 20, height: 20});
            expect(image.data).toEqual(white20x20);
            done();
        };
        img.src = '/base/testImages/white.png';
    });

    describe('fromUrl, creating image data from url:', () => {
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
            const url = '/base/testImages/white.png';
            image.fromUrl(url)
                .then(img => {
                    expect(img.size).toEqual({width: 20, height: 20});
                    expect(img.data).toEqual(white20x20);
                    done();
                });
        });
    });

    describe('copy, copy an image:', () => {
        it ('failed with type', done => {
            const image = new ImageCore('RGB');
            const image2 = new ImageCore('L');
            try {
                image2.copy(image);
            } catch (err) {
                expect(err.name).toBe('ImageModeError');
                done();
            }
        });
        it('successful', done => {
            const image = new ImageCore();
            const image2 = new ImageCore();
            const url = '/base/testImages/white.png';
            image.fromUrl(url)
                .then(img => {
                    image2.copy(img);
                    expect(image2.size).toEqual(img.size);
                    expect(img.data).toEqual(img.data);
                    done();
                });
        });
    });
});
