/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */

import {
    TColorSpaces, TImageSize, TPixel, TPoint, TCoords,
    PIXEL_SIZE, Environments
} from '../constants';
import {Exceptions} from './exceptions';

export class ImageCore {
    private _mode: TColorSpaces;
    private _width: number;
    private _height: number;
    public data: Uint8ClampedArray;

    constructor(mode: TColorSpaces = <TColorSpaces>'RGBA') {
        this._mode = mode;
        this._width = 0;
        this._height = 0;
        this.data = new Uint8ClampedArray([]);
    }

    public get mode(): TColorSpaces {
        return this._mode;
    }

    public get size(): TImageSize {
        return {width: this._width, height: this._height};
    }

    public fromImage(image: HTMLImageElement): ImageCore {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        this._width = image.width;
        this._height = image.height;
        this.data = context.getImageData(0, 0, image.width, image.height).data;
        return this;
    }

    private _getDataInBrowser(url: string) : Promise<ImageCore> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(this.fromImage(image));
            };
            image.onerror = () => {
                this._width = 0;
                this._height = 0;
                this.data = new Uint8ClampedArray([]);
                reject(new Exceptions.InvalidImagePathError(url));
            };
            image.src = url;
        });
    }

    private _getDataInNode(url: string) : Promise<ImageCore> {
        return new Promise((resolve, reject) => resolve());
    }

    public fromUrl(url: string): Promise<ImageCore> {
        if (this._mode !== 'RGBA' && this._mode !== 'RGB') {
            return new Promise((resolve, reject) =>
                reject(new Exceptions.ImageModeError(this._mode, 'RGB', 'RGBA'))
            );
        }
        return Environments.BROWSER_MODE
            ? this._getDataInBrowser(url)
            : this._getDataInNode(url);
    }

    public copy(image: ImageCore): ImageCore {
        if (image._mode !== this._mode) {
            throw new Exceptions.ImageModeError(image._mode, this._mode);
        }
        this._width = image._width;
        this._height = image._height;
        this.data = image.data;
        return this;
    }

    public setPixel(position: TCoords, pixel: TPixel): ImageCore {
        const start = (this._width * position[1] + position[0]) * PIXEL_SIZE[this._mode];
        this.data.set(new Uint8ClampedArray(pixel), start);
        return this;
    }

    public getPixel(position: TCoords): TPixel {
        const start = (this._width * position[1] + position[0]) * PIXEL_SIZE[this._mode];
        return this.data.subarray(start, start + PIXEL_SIZE[this._mode]);
    }

    private _loopWithPoints(
        pointOption: (point: TPoint) => TPixel | void,
        modify: boolean = false
    ) : void {
        for (let y = 0; y < this._height; y += 1) {
            for (let x = 0; x < this._width; x += 1) {
                const position: TCoords = [x, y];
                if (modify) {
                    this.setPixel(position, <TPixel>pointOption([position, this.getPixel(position)]));
                } else {
                    pointOption([position, this.getPixel(position)]);
                }
            }
        }
    }

    public map(pointOption: (point: TPoint) => TPixel) : ImageCore {
        this._loopWithPoints(pointOption, true);
        return this;
    }

    public forEach(pointOption: (point: TPoint) => void) : void {
        this._loopWithPoints(pointOption);
    }
}
