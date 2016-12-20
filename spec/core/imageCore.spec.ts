/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: testing for core/ImageCore.
 */

import {ImageCore} from '../../src/core';
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

    describe('copy, copying an image:', () => {
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

    it('setPixel and getPixel, setting or getting pixel in image with position:', done => {
        const image = new ImageCore();
        const url = '/base/testImages/white.png';
        image.fromUrl(url)
            .then(img => {
                img.setPixel([0, 0], [0, 0, 0, 1]);
                img.setPixel([19, 19], [100, 100, 100, 1]);
                expect(img.getPixel([0, 0])).toEqual(new Uint8ClampedArray([0, 0, 0, 1]));
                expect(img.getPixel([19, 19])).toEqual(new Uint8ClampedArray([100, 100, 100, 1]));
                done();
            });
    });

    it('forEach, handling points with given option:', done => {
        const image = new ImageCore();
        const url = '/base/testImages/white.png';
        image.fromUrl(url)
            .then(img => {
                let x = 0;
                let y = 0;
                img.forEach(point => {
                    const [position, pixel] = point;
                    expect([x, y]).toEqual(position);
                    expect(pixel).toEqual(new Uint8ClampedArray([255, 255, 255, 255]));
                    y = x === 19 ? y + 1 : y;
                    x = x === 19 ? 0 : x + 1;
                });
                done();
            });
    });

    it('map, modify points with given option:', done => {
        const image = new ImageCore();
        const url = '/base/testImages/white.png';
        image.fromUrl(url)
            .then(img => {
                let x = 0;
                let y = 0;
                img.map(point => {
                    const [position,] = point;
                    expect([x, y]).toEqual(position);
                    y = x === 19 ? y + 1 : y;
                    x = x === 19 ? 0 : x + 1;
                    return [0, 0, 0, 255];
                });
                expect(img.data).toEqual(black20x20);
                done();
            });
    });
});
