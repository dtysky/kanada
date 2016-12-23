/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/23
 * Description: testing for reversal.
 */

import {ImageCore} from '../../src/core';
import {COLOR_SPACES, TColorSpace} from '../../src/constants';
import {colorReversal} from '../../src/point';
import * as TD from './imageData.testcase';

describe('ColorSpaceConvert', () => {
    describe('successful:', () => {
        for (const color of COLOR_SPACES) {
            it(color, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.CR20x20[`${color}_O`], <TColorSpace>color);
                expect(colorReversal(image)).toEqual(jasmine.any(ImageCore));
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
                image.fromUrl(url)
                    .then(img => {
                        img.changeMode(<TColorSpace>color);
                        const s = performance.now();
                        colorReversal(img);
                        // tslint:disable-next-line
                        console.log('Performance, colorSpaceConvert', color, img.size, img.mode, 'time(ms)', (performance.now() - s));
                        done();
                    });
            });
        }
    });
});
