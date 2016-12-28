/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */

import {
    TColorSpace, TImageSize, TPixel, TCoord, TPosition, TBuffer,
    PIXEL_SIZE, Environments
} from '../constants';
import {Exceptions} from './exceptions';

export class ImageCore {
    private _mode: TColorSpace;
    private _context: CanvasRenderingContext2D;
    private _data: ImageData;
    // a flag for push back data to context lazily
    public dataIsModified: boolean;

    constructor(
        mode: TColorSpace = <TColorSpace>'RGBA'
    ) {
        this._mode = mode;
        this._context = document.createElement('canvas').getContext('2d');
        this._data = new ImageData(1, 1);
        this.dataIsModified = false;
    }

    public get mode(): TColorSpace {
        return this._mode;
    }

    public get size(): TImageSize {
        return [this._data.width, this._data.height];
    }

    public get data(): TBuffer {
        // to avoid changing private data
        return new Uint8ClampedArray(this._data.data);
    }

    public fromImage(
        image: HTMLImageElement
    ): ImageCore {
        if (this._mode !== 'RGBA') {
            throw new Exceptions.ColorSpaceError('the mode of image', this._mode, 'RGBA');
        }
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        this._context = context;
        this._data = context.getImageData(0, 0, image.width, image.height);
        return this;
    }

    public fromBuffer(
        size: TImageSize,
        buffer: TBuffer,
        mode?: TColorSpace
    ): ImageCore {
        if (size[0] * size[1] * 4 !== buffer.length) {
            throw new Exceptions.BufferSizeError(buffer.length, size[0] * size[1] * 4);
        }
        const canvas = document.createElement('canvas');
        canvas.width = size[0];
        canvas.height = size[1];
        const context = canvas.getContext('2d');
        this._data = context.getImageData(0, 0, canvas.width, canvas.height);
        this._data.data.set(buffer, 0);
        context.putImageData(this._data, 0, 0);
        this._context = context;
        this._mode = mode || this._mode;
        return this;
    }

    private _getDataInBrowser(
        url: string
    ) : Promise<ImageCore> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(this.fromImage(image));
            };
            image.onerror = () => {
                this._data = new ImageData(1, 1);
                reject(new Exceptions.InvalidImagePathError(url));
            };
            image.src = url;
        });
    }

    private _getDataInNode(
        url: string
    ) : Promise<ImageCore> {
        return new Promise((resolve, reject) => resolve());
    }

    public fromUrl(
        url: string
    ): Promise<ImageCore> {
        if (this._mode !== 'RGBA') {
            return new Promise((resolve, reject) =>
                reject(new Exceptions.ColorSpaceError('the mode of image', this._mode, 'RGBA'))
            );
        }
        return Environments.BROWSER_MODE
            ? this._getDataInBrowser(url)
            : this._getDataInNode(url);
    }

    public copy(
        image: ImageCore
    ): ImageCore {
        if (image._mode !== this._mode) {
            throw new Exceptions.ColorSpaceError('the mode of image', image._mode, this._mode);
        }
        this._data = image._data;
        this._context = image._context;
        this.dataIsModified = image.dataIsModified;
        return this;
    }

    public changeMode(
        mode: TColorSpace
    ): ImageCore {
        this._mode = mode;
        return this;
    }

    public pushDataBackToContext() {
        this._context.putImageData(this._data, 0, 0);
        this.dataIsModified = false;
    }

    public modifyData(
        imageOption: (data: Uint8ClampedArray, size: TImageSize) => void
    ): ImageCore {
        imageOption(this._data.data, this.size);
        this.dataIsModified = true;
        return this;
    }

    public modifyContext(
        contextOption: (context: CanvasRenderingContext2D, size: TImageSize) => void
    ): ImageCore {
        if (this.dataIsModified) {
            this.pushDataBackToContext();
        }
        contextOption(this._context, this.size);
        this._data = this._context.getImageData(0, 0, this.size[0], this.size[1]);
        return this;
    }

    public setPixel(
        x: TCoord,
        y: TCoord,
        pixel: TPixel
    ): ImageCore {
        const start = (this._data.width * y + x) * PIXEL_SIZE[this._mode];
        this._data.data.set(new Uint8ClampedArray(pixel), start);
        return this;
    }

    public getPixel(
        x: TCoord,
        y: TCoord
    ): TPixel {
        const start = (this._data.width * y + x) * PIXEL_SIZE[this._mode];
        return this._data.data.subarray(start, start + PIXEL_SIZE[this._mode]);
    }

    private _loopWithPoints(
        pointOption: (pixel: TPixel, position: TPosition) => TPixel | void,
        modify: boolean = false
    ) : void {
        const size = this.data.length;
        const rowSize = this._data.width - 1;
        let x = 0;
        let y = 0;
        if (modify) {
            for (let pos = 0; pos < size; pos += 4) {
                this._data.data.set(
                    pointOption(this._data.data.subarray(pos, pos + PIXEL_SIZE[this._mode]), [x, y]),
                    pos
                );
                y = x === rowSize ? y + 1 : y;
                x = x === rowSize ? 0 : x + 1;
            }
        } else {
            for (let pos = 0; pos < size; pos += 4) {
                pointOption(this._data.data.subarray(pos, pos + PIXEL_SIZE[this._mode]), [x, y]);
                y = x === rowSize ? y + 1 : y;
                x = x === rowSize ? 0 : x + 1;
            }
        }
    }

    public map(
        pointOption: (pixel: TPixel, position: TPosition) => TPixel
    ) : ImageCore {
        this._loopWithPoints(pointOption, true);
        this.dataIsModified = true;
        return this;
    }

    public forEach(
        pointOption: (ppixel: TPixel, position: TPosition) => void
    ) : ImageCore {
        this._loopWithPoints(pointOption);
        return this;
    }
}
