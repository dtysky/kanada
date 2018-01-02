/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/23
 * Description: testing for ColorReverse.
 */

import {ImageCore} from '../../src/core';
import {COLOR_SPACES, TColorSpace} from '../../src/constants';
import {colorInvert} from '../../src/point';
import * as TD from './imageData.testcase';

describe('ColorInvert', () => {
    describe('successful:', () => {
        for (const color of COLOR_SPACES) {
            it(color, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.CR20x20[`${color}_O`], <TColorSpace>color);
                expect(colorInvert()(image)).toEqual(jasmine.any(ImageCore));
                expect(image.data).toEqual(TD.CR20x20[`${color}_R`]);
                expect(image.mode).toEqual(color);
            });
        }
    });

    describe('test for performance:', () => {
        for (const color of COLOR_SPACES) {
            it(color, done => {
                const image = new ImageCore();
                const url = '/base/testImages/rgba.png';
                image.fromURL(url)
                    .then(img => {
                        img.changeMode(<TColorSpace>color);
                        const s = performance.now();
                        colorInvert()(img);
                        // tslint:disable-next-line
                        console.log('Performance, colorInvert', color, img.size, img.mode, 'time(ms)', (performance.now() - s));
                        done();
                    });
            });
        }
    });
});
