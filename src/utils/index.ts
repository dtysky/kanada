/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */

import {ImageCore, Exceptions} from '../core';
import {TRegion} from '../constants';

export const changeRegion = (
    region: TRegion
) => (image: ImageCore) => {
    image.region = region;
    return image;
};
