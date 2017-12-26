/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 17/1/6
 * Description:
 */
import {ImageCore} from '../../src/core';
import {translate} from '../../src/geometry';
import * as TD from './imageData.testcase';

describe('Translate', () => {
    it('Base', () => {
        const image = new ImageCore();
        image.fromBuffer([20, 20], TD.TS200x200.O);
        expect(translate(image, TD.TS200x200.T)).toEqual(jasmine.any(ImageCore));
        expect(image.data).toEqual(TD.TS200x200.R);
    });

    describe('test for performance:', () => {
        it('Base', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromUrl(url)
                .then(img => {
                    const s = performance.now();
                    translate(img, TD.TS200x200.T);
                    // tslint:disable-next-line
                    console.log('Performance, Translate', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
    });
});
