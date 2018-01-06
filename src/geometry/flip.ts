/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 5 Jan 2018
 * Description:
 */
import {ImageCore} from '../core';
import {TPosition, TPixel, TRegion} from '../constants';
import geometryBaseOperate from './base';

export function flip (
    mode: 'h' | 'v' | 'all' = 'h'
) {
    return geometryBaseOperate(
        [0, 0, 0, 0],
        () => ({}),
        (newX: number, newY: number, args: any, image: ImageCore) => {
            switch (mode) {
                case 'h':
                    return {
                        oldX: image.width - newX,
                        oldY: newY
                    }
                case 'v':
                    return {
                        oldX: newX,
                        oldY: image.height - newY
                    }
                case 'all':
                    return {
                        oldX: image.width - newX,
                        oldY: image.height - newY
                    }
                default:
                    break;
            }
        }
    );
}
