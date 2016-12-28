/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: image data for testing.
 */

import {genRandomPointsContext, getBufferFromContext} from '../utils';

// clip
export namespace CLIP200x200 {
    let context = genRandomPointsContext([200, 200]);
    export const ARC_O = getBufferFromContext(context);
    export const ARC_P = [100, 100, 75, 0, Math.PI * 2];
    context.arc.apply(context, ARC_P);
    export const ARC_R = getBufferFromContext(context);

    context = genRandomPointsContext([200, 200]);
    export const ELLIPSE_O = getBufferFromContext(context);
    export const ELLIPSE_P = [100, 100, 50, 75, 45 * Math.PI / 180, 0, 2 * Math.PI];
    context.ellipse.apply(context, ELLIPSE_P);
    export const ELLIPSE_R = getBufferFromContext(context);

    context = genRandomPointsContext([200, 200]);
    export const RECT_O = getBufferFromContext(context);
    export const RECT_P = [50, 50, 100, 100];
    context.rect.apply(context, RECT_P);
    export const RECT_R = getBufferFromContext(context);
}
