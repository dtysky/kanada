/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/20
 * Description: testing for point/globalThreshold.
 */

import {ImageCore} from '../../src/core';
import {globalThreshold} from '../../src/point';
import * as TD from './imageData.testcase';

describe('GlobalThreshold', () => {
    it('failed with type', () => {
        const image = new ImageCore();
        try {
            globalThreshold(100)(image);
        } catch (err) {
            expect(err.name).toEqual('ColorSpaceError');
        }
    });

    describe('successful:', () => {
        it('Base, White', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.GTH20x20.ORG, 'L');
            expect(globalThreshold(TD.GTH20x20.WHITE_TH)(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.GTH20x20.WHITE_R);
            expect(image.mode).toEqual('B');
        });
        it('Base, Black', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.GTH20x20.ORG, 'L');
            expect(globalThreshold(TD.GTH20x20.BLACK_TH)(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.GTH20x20.BLACK_R);
            expect(image.mode).toEqual('B');
        });
        it('Contour, White', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.GTH20x20.ORG, 'L');
            expect(globalThreshold(TD.GTH20x20.WHITE_TH, TD.GTH20x20.WHITE_TH2)(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.GTH20x20.WHITE_R);
            expect(image.mode).toEqual('B');
        });
        it('Contour, Black', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.GTH20x20.ORG, 'L');
            expect(globalThreshold(TD.GTH20x20.BLACK_TH, TD.GTH20x20.BLACK_TH2)(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.GTH20x20.BLACK_R);
            expect(image.mode).toEqual('B');
        });
    });

    describe('test for performance:', () => {
        fit ('Base', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    img.changeMode('L');
                    const s = performance.now();
                    globalThreshold(100)(img);
                    // tslint:disable-next-line
                    console.log('Performance, GlobalThreshold, Base', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
        it ('Contour', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    img.changeMode('L');
                    const s = performance.now();
                    globalThreshold(100, 200)(img);
                    // tslint:disable-next-line
                    console.log('Performance, GlobalThreshold, Contour', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
    });
});
