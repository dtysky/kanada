/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */

import {Constants} from '../constants/index';
import {Errors} from '../core/index';

export class ImageCore {
    private mode: Constants.ColorSpaces;
    private width: number;
    private height: number;
    public data: ImageData;

    constructor(mode: Constants.ColorSpaces = 'RGBA') {
        this.mode = mode;
        this.width = 0;
        this.height = 0;
    }

    public fromUrl(url?: string): ImageCore {
        if (this.mode !== 'RGBA' || this.mode !== 'RGB') {
            throw new Errors.ImageModeError(this.mode, 'RGB or RGBA');
        }
        if (url === '') {
            this.data = ImageData();
            this.width = 0;
            this.height = 0;
        } else {
            const image = new Image();
            image.src = url;

        }
        return this;
    }

    public fromImage(image: HTMLImageElement): ImageCore {
        return this;
    }

    public fromBuffer(buffer: ImageCore): ImageCore {
        return this;
    }

    public copy(image: ImageCore): ImageCore {
        if (image.mode !== this.mode) {
            throw new Errors.ImageModeError(image.mode, this.mode);
        }
        return this;
    }

    public mode(): Constants.ColorSpaces {
        return this.mode;
    }

    public size(): {width: number, height: number} {
        return {width: this.width, height: this.height};
    }
}
