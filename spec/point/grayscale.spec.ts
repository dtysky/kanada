/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/20
 * Description: testing for point/grayscale.
 */

import {ImageCore} from '../../src/core';
import {grayscale} from '../../src/point';
import {
    rgba20x20, rgb20x20, bgra20x20, bgr20x20,
    gray20x20Rgba, gray20x20Rgb, gray20x20Bgra, gray20x20Bgr
} from './imageData.testcase';

describe('Grayscale', () => {
    it('failed with type', () => {
        const image = new ImageCore('L');
        try {
            grayscale(image);
        } catch (err) {
            expect(err.name).toEqual('ColorSpaceError');
        }
    });

    describe('successful:', () => {
        it('RGBA', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], rgba20x20);
            expect(grayscale(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(gray20x20Rgba);
            expect(image.mode).toEqual('L');
        });
        it('RGB', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], rgb20x20);
            expect(grayscale(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(gray20x20Rgb);
            expect(image.mode).toEqual('L');
        });
        it('BGRA', () => {
            const image = new ImageCore('BGRA');
            image.fromBuffer([20, 20], bgra20x20);
            expect(grayscale(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(gray20x20Bgra);
            expect(image.mode).toEqual('L');
        });
        it('BGR', () => {
            const image = new ImageCore('BGR');
            image.fromBuffer([20, 20], bgr20x20);
            expect(grayscale(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(gray20x20Bgr);
            expect(image.mode).toEqual('L');
        });
    });

    describe('test for performance:', () => {
        it('RGBA', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromUrl(url)
                .then(img => {
                    const s = performance.now();
                    grayscale(img);
                    // tslint:disable-next-line
                    console.log('Performance, Grayscale, RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
    });
});
