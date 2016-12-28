/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/24
 * Description: testing for point/logTransform
 */

import {ImageCore} from '../../src/core';
import {COLOR_SPACES, TColorSpace} from '../../src/constants';
import {logTransform} from '../../src/point';
import * as TD from './imageData.testcase';

describe('LogTransform', () => {
    describe('failed with size:', () => {
        for (const color of COLOR_SPACES) {
            it(color, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.LOGT20x20[`${color}_O`], <TColorSpace>color);
                try {
                    logTransform(image, []);
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
                image.fromBuffer([20, 20], TD.LOGT20x20[`${color}_O`], <TColorSpace>color);
                expect(logTransform(image, TD.LOGT20x20[`${color}_T`])).toEqual(jasmine.any(ImageCore));
                expect(image.data).toEqual(TD.LOGT20x20[`${color}_R`]);
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
                        logTransform(img, TD.LOGT20x20[`${color}_T`]);
                        // tslint:disable-next-line
                        console.log('Performance, LogTransform', color, img.size, img.mode, 'time(ms)', (performance.now() - s));
                        done();
                    });
            });
        }
    });
});


