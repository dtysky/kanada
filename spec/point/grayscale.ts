/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/20
 * Description: testing for point/grayscale.
 */

import {ImageCore} from '../../src/core';
import {grayscale} from '../../src/point';

describe('Grayscale', () => {
    it ('failed with type', () => {
        const image = new ImageCore('L');
        try {
            grayscale(image);
        } catch (err) {
            expect(err.name).toEqual('ImageModeError');
        }
    });

    describe('test for performance:', () => {
        fit ('RGBA', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromUrl(url)
                .then(img => {
                    const s = performance.now();
                    grayscale(img);
                    img.changeMode('RGBA');
                    grayscale(img);
                    img.changeMode('RGBA');
                    grayscale(img);
                    img.changeMode('RGBA');
                    grayscale(img);
                    img.changeMode('RGBA');
                    grayscale(img);
                    // tslint:disable-next-line
                    console.log('Performance, Grayscale, RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
    });
});
