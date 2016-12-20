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
        if (this._mode !== 'RGBA' && this._mode !== 'RGB' && this._mode !== 'BGR' && this._mode !== 'BGRA') {
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

    public changeMode(mode: TColorSpaces) {
        this._mode = mode;
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
        const size = this._width * this._height * PIXEL_SIZE[this._mode];
        const rowSize = this._width - 1;
        let x = 0;
        let y = 0;
        for (let pos = 0; pos < size; pos += 4) {
            const position: TCoords = [x, y];
            if (modify) {
                switch (PIXEL_SIZE[this._mode]) {
                    case 1:
                        this.data[pos] = (<TPixel>pointOption([position, [this.data[pos]]]))[0];
                        continue;
                    default:
                        this.data.set(
                            pointOption([position, this.data.subarray(pos, pos + PIXEL_SIZE[this._mode])]),
                            pos
                        );
                        continue;
                }
            } else {
                pointOption([position, this.data.subarray(pos, pos + PIXEL_SIZE[this._mode])]);
            }
            y = x === rowSize ? y + 1 : y;
            x = x === rowSize ? 0 : x + 1;
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
