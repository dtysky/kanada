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
            globalThreshold(image, 100);
        } catch (err) {
            expect(err.name).toEqual('ColorSpaceError');
        }
    });

    describe('successful:', () => {
        it('White', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.GTH20x20.ORG, 'L');
            expect(globalThreshold(image, TD.GTH20x20.WHITE_TH)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.GTH20x20.WHITE_R);
            expect(image.mode).toEqual('B');
        });
        it('Black', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.GTH20x20.ORG, 'L');
            expect(globalThreshold(image, TD.GTH20x20.BLACK_TH)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.GTH20x20.BLACK_R);
            expect(image.mode).toEqual('B');
        });
    });

    it('test for performance:', done => {
        const image = new ImageCore();
        const url = '/base/testImages/rgba.png';
        image.fromUrl(url)
            .then(img => {
                img.changeMode('L');
                const s = performance.now();
                globalThreshold(img, 100);
                // tslint:disable-next-line
                console.log('Performance, GlobalThreshold', img.size, img.mode, 'time(ms)', (performance.now() - s));
                done();
            });
    });
});
