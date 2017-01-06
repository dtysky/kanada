/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/28
 * Description: testing for geometry/clip.
 */

import {ImageCore} from '../../src/core';
import {CLIP_MODES, TClipMode} from '../../src/constants';
import {clip} from '../../src/geometry';
import * as TD from './imageData.testcase';

describe('Clip', () => {
    describe('successful:', () => {
        for (const mode of CLIP_MODES) {
            it(mode, () => {
                const image = new ImageCore();
                image.fromBuffer([20, 20], TD.CLIP200x200[`${mode}_O`]);
                expect(clip(image, <TClipMode>mode, TD.CLIP200x200[`${mode}_P`])).toEqual(jasmine.any(ImageCore));
                expect(image.data).toEqual(TD.CLIP200x200[`${mode}_R`]);
            });
        }
    });

    describe('test for performance:', () => {
        for (const mode of CLIP_MODES) {
            it(mode, done => {
                const image = new ImageCore();
                const url = '/base/testImages/rgba.png';
                image.fromUrl(url)
                    .then(img => {
                        const s = performance.now();
                        clip(img, <TClipMode>mode, TD.CLIP200x200[`${mode}_P`]);
                        // tslint:disable-next-line
                        console.log('Performance, Clip', mode, img.size, img.mode, 'time(ms)', (performance.now() - s));
                        done();
                    });
            });
        }
    });
});
