/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: testing for point/logTransform
 */

import {ImageCore} from '../../src/core';
import {COLOR_SPACES, TColorSpace} from '../../src/constants';
import {gammaTransform} from '../../src/point';
import * as TD from './imageData.testcase';

describe('GammaTransform', () => {
    describe('failed with size:', () => {
        for (const color of COLOR_SPACES) {
            it(color, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.GT20x20[`${color}_O`], <TColorSpace>color);
                try {
                    gammaTransform(image, [], []);
                } catch (err) {
                    expect(err.name).toEqual('ArraySizeError');
                }
            });
        }
    });

    describe('successful:', () => {
        for (const color of COLOR_SPACES) {
            it(color, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.GT20x20[`${color}_O`], <TColorSpace>color);
                expect(gammaTransform(image, TD.GT20x20[`${color}_T`], TD.GT20x20[`${color}_G`])).toEqual(jasmine.any(ImageCore));
                expect(image.data).toEqual(TD.GT20x20[`${color}_R`]);
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
                        gammaTransform(img, TD.GT20x20[`${color}_T`], TD.GT20x20[`${color}_G`]);
                        // tslint:disable-next-line
                        console.log('Performance, linearTransform', color, img.size, img.mode, 'time(ms)', (performance.now() - s));
                        done();
                    });
            });
        }
    });
});
