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
            'number' | 'ck' | 'image' | 'colorSpace' | 'position' | 'pixel' | 'boolean',
            any
        ][]
    }
};

export const defaultImage = '/static/image.jpg';
export const defaultMask = '/static/mask.png';
export const defaultFg = '/static/fg.jpg';

export const metaTable: TMeta = {
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
    }
};

export const metaTableKeys = Object.keys(metaTable);
