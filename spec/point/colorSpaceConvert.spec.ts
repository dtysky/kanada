/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/22
 * Description: testing for point/colorSpaceConvert.
 */

import {ImageCore} from '../../src/core';
import {colorSpaceConvert} from '../../src/point';
import * as TD from './imageData.testcase';

describe('ColorSpaceConvert', () => {
    it('failed with type', () => {
        const image = new ImageCore('HSL');
        try {
            colorSpaceConvert('HSV')(image);
        } catch (err) {
            expect(err.name).toEqual('ColorSpaceError');
        }
    });

    it('failed with type L or B', () => {
        let image = new ImageCore('RGBA');
        try {
            colorSpaceConvert('L')(image);
        } catch (err) {
            expect(err.name).toEqual('ColorSpaceError');
        }
        image = new ImageCore('RGBA');
        try {
            colorSpaceConvert('B')(image);
        } catch (err) {
            expect(err.name).toEqual('ColorSpaceError');
        }
    });

    describe('successful:', () => {
        it('RGBA to RGBA', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscRgba20x20);
            expect(colorSpaceConvert('RGBA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscRgba20x20);
            expect(image.mode).toEqual('RGBA');
        });
        it('RGB to RGBA', () => {
            const image = new ImageCore('RGB');
            image.fromBuffer([20, 20], TD.cscRgb20x20);
            expect(colorSpaceConvert('RGBA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscRgb20x20);
            expect(image.mode).toEqual('RGBA');
        });
        it('L to RGBA', () => {
            const image = new ImageCore('L');
            image.fromBuffer([20, 20], TD.cscL2RGBA20x20L);
            expect(colorSpaceConvert('RGBA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscL2RGBA20x20RGBA);
            expect(image.mode).toEqual('RGBA');
        });
        it('RGBA to BGR', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscRgba20x20);
            expect(colorSpaceConvert('BGR')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscBgr20x20);
            expect(image.mode).toEqual('BGR');
        });
        it('RGBA to BGRA', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscRgba20x20);
            expect(colorSpaceConvert('BGRA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscBgra20x20);
            expect(image.mode).toEqual('BGRA');
        });

        it('RGBA to CMKY', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscRgba20x20);
            expect(colorSpaceConvert('CMYK')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscCMYK20x20);
            expect(image.mode).toEqual('CMYK');
        });
        it('CMYK to RGBA', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscCMYK20x20, 'CMYK');
            expect(colorSpaceConvert('RGBA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscRgb20x20);
            expect(image.mode).toEqual('RGBA');
        });

        it('RGBA to HSL', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscRgba20x20);
            expect(colorSpaceConvert('HSL')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscHSL20x20);
            expect(image.mode).toEqual('HSL');
        });
        it('HSL to RGBA', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscHSL20x20, 'HSL');
            expect(colorSpaceConvert('RGBA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscRgba20x20);
            expect(image.mode).toEqual('RGBA');
        });

        it('RGBA to HSV', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscRgba20x20);
            expect(colorSpaceConvert('HSV')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscHSV20x20);
            expect(image.mode).toEqual('HSV');
        });
        it('HSV to RGBA', () => {
            const image = new ImageCore();
            image.fromBuffer([20, 20], TD.cscHSV20x20, 'HSV');
            expect(colorSpaceConvert('RGBA')(image)).toEqual(jasmine.any(ImageCore));
            expect(image.data).toEqual(TD.cscRgba20x20);
            expect(image.mode).toEqual('RGBA');
        });
    });

    describe('test for performance:', () => {
        it('RGB to RGBA', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    img.changeMode('RGB');
                    const s = performance.now();
                    colorSpaceConvert('RGBA')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, RGB to RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
        it('L to RGBA', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    img.changeMode('L');
                    const s = performance.now();
                    colorSpaceConvert('RGBA')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, L to RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
        it('RGBA to BGR', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    const s = performance.now();
                    colorSpaceConvert('BGR')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, RGBA to BGR', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
        it('RGBA <-> CMYK', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    let s = performance.now();
                    colorSpaceConvert('CMYK')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, RGBA to CMYK', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    s = performance.now();
                    colorSpaceConvert('RGBA')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, CMYK to RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
        it('RGBA <-> HSL', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    let s = performance.now();
                    colorSpaceConvert('HSL')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, RGBA to HSL', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    s = performance.now();
                    colorSpaceConvert('RGBA')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, HSL to RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
        it('RGBA <-> HSV', done => {
            const image = new ImageCore();
            const url = '/base/testImages/rgba.png';
            image.fromURL(url)
                .then(img => {
                    let s = performance.now();
                    colorSpaceConvert('HSV')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, RGBA to HSV', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    s = performance.now();
                    colorSpaceConvert('RGBA')(img);
                    // tslint:disable-next-line
                    console.log('Performance, colorSpaceConvert, HSV to RGBA', img.size, img.mode, 'time(ms)', (performance.now() - s));
                    done();
                });
        });
    });
});
