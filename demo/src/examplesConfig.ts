/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 7 Jan 2018
 * Description:
 */
import * as kanata from '../../src';

type TMeta = {
    [name: string]: {
        operation: (...args) => kanata.TOperate,
        // [name, type, default]
        args: [
            string,
            'number' | 'ck' | 'image' | 'colorSpace' | 'position' | 'pixel' | 'boolean' | 'region' | string[],
            any
        ][]
    }
};

export const defaultImage = '/static/image.jpg';
export const defaultMask = '/static/mask.png';
export const defaultFg = '/static/fg.jpg';

export const metaTable: TMeta = {
    // point operations
    grayscale: {
        operation: kanata.grayscale,
        args: []
    },
    colorInvert: {
        operation: kanata.colorInvert,
        args: []
    },
    bitCuts: {
        operation: kanata.bitsCut,
        args: [
            ['lowBit', 'number', 3],
            ['highBit', 'number', 7]
        ]
    },
    colorSpaceConvert: {
        operation: kanata.colorSpaceConvert,
        args: [
            ['dstMode', 'colorSpace', 'HSV']
        ]
    },
    contrastStretch: {
        operation: kanata.contrastStretch,
        args: [
            ['r1', 'number', 40],
            ['s1', 'number', 40],
            ['r2', 'number', 160],
            ['s2', 'number', 160]
        ]
    },
    gammaTransform: {
        operation: kanata.gammaTransform,
        args: [
            ['times', 'number', 1],
            ['gammas', 'number', 2]
        ]
    },
    globalThreshold: {
        operation: kanata.globalThreshold,
        args: [
            ['th', 'number', 100],
            ['th2', 'number', 160]
        ]
    },
    grayLayered: {
        operation: kanata.grayLayered,
        args: [
            ['r1', 'number', 40],
            ['s1', 'number', 40],
            ['r2', 'number', 160],
            ['s2', 'number', 160]
        ]
    },
    linearTransform: {
        operation: kanata.linearTransform,
        args: [
            ['gains', 'number', 2]
        ]
    },
    logTransform: {
        operation: kanata.logTransform,
        args: [
            ['times', 'number', 2]
        ]
    },
    mask: {
        operation: kanata.mask,
        args: [
            ['maskImage', 'image', defaultMask],
            ['reverse', 'boolean', false],
            ['front', 'image', defaultFg]
        ]
    },
    // geometry operations
    affineTransform: {
        operation: kanata.affineTransform,
        args: [
            ['aux', 'number', 1],
            ['auy', 'number', .1],
            ['au', 'number', 0],
            ['avx', 'number', .1],
            ['avy', 'number', 1],
            ['av', 'number', 0],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    crop: {
        operation: kanata.crop,
        args: [
            ['offset', 'region', [10, 10, 100, 100]],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    flip: {
        operation: kanata.flip,
        args: [
            ['mode', ['h', 'v', 'all'], 'h'],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    rotate: {
        operation: kanata.rotate,
        args: [
            ['angle', 'number', .5],
            ['anchor', 'position', [0, 0]],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    scale: {
        operation: kanata.scale,
        args: [
            ['factors', 'position', [10, 10]],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    skew: {
        operation: kanata.skew,
        args: [
            ['factors', 'position', [.5, .5]],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    translate: {
        operation: kanata.translate,
        args: [
            ['offset', 'position', [10, 10]],
            ['background', 'pixel', [0, 0, 0, 0]]
        ]
    },
    // local filter
    meanFilter: {
        operation: kanata.meanFilter,
        args: [
            ['size', 'number', 3]
        ]
    },
    rankFilter: {
        operation: kanata.rankFilter,
        args: [
            ['size', 'number', 3],
            ['rank', 'number', 3]
        ]
    },
    convolutionFilter: {
        operation: kanata.convolutionFilter,
        args: [
            ['ck', 'ck', '[[0, 0.2, 0],\n[0.2, 0, 0.2],\n[0, 0.2, 0]]']
        ]
    },
    localThreshold: {
        operation: kanata.localThreshold,
        args: [
            ['thMap', 'image', '']
        ]
    }
};

export const metaTableKeys = Object.keys(metaTable);
