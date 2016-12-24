/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: testing for point/linearTransform
 */

import {ImageCore} from '../../src/core';
import {COLOR_SPACES, TColorSpace} from '../../src/constants';
import {linearTransform} from '../../src/point';
import * as TD from './imageData.testcase';

describe('LinearTransform', () => {
    describe('successful:', () => {
        for (const color of COLOR_SPACES) {
            it(color, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.LT20x20[`${color}_O`], <TColorSpace>color);
                expect(linearTransform(image, TD.LT20x20[`${color}_G`])).toEqual(jasmine.any(ImageCore));
                expect(image.data).toEqual(TD.LT20x20[`${color}_R`]);
                expect(image.mode).toEqual(color);
            });
        }
    });

    describe('test for performance:', () => {
        for (const color of COLOR_SPACES) {
            it(color, done => {
                const image = new ImageCore();
                const url = '/base/testImages/rgba.png';
                image.fromUrl(url)
                    .then(img => {
                        img.changeMode(<TColorSpace>color);
                        const s = performance.now();
                        linearTransform(img, TD.LT20x20[`${color}_G`]);
                        // tslint:disable-next-line
                        console.log('Performance, linearTransform', color, img.size, img.mode, 'time(ms)', (performance.now() - s));
                        done();
                    });
            });
        }
    });
});

