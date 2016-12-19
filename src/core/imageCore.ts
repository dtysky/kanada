/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */

import {TColorSpaces, Environments} from '../constants/index';
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

    private getDataInNode(url: string) : Promise<ImageCore> {
        return new Promise((resolve, reject) => resolve());
    }

    private getDataInBrowser(url: string) : Promise<ImageCore> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, image.width, image.height);
                this._width = image.width;
                this._height = image.height;
                this.data = context.getImageData(0, 0, image.width, image.height).data;
                resolve(this);
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

    public fromUrl(url: string): Promise<ImageCore> {
        if (this._mode !== <TColorSpaces>'RGBA' && this._mode !== <TColorSpaces>'RGB') {
            return new Promise((resolve, reject) =>
                reject(new Exceptions.ImageModeError(this._mode, 'RGB', 'RGBA'))
            );
        }
        return Environments.BROWSER_MODE
            ? this.getDataInBrowser(url)
            : this.getDataInNode(url);
    }

    public fromImage(image: HTMLImageElement): ImageCore {
        return this;
    }

    public fromBuffer(buffer: Uint8ClampedArray): ImageCore {
        return this;
    }

    public copy(image: ImageCore): ImageCore {
        if (image._mode !== this._mode) {
            throw new Exceptions.ImageModeError(image._mode, this._mode);
        }
        return this;
    }

    public get mode(): TColorSpaces {
        return this._mode;
    }

    public get size(): {width: number, height: number} {
        return {width: this._width, height: this._height};
    }

    private loopWithPoints(
        pointOption: (point: [number]) => number[] | void,
        modify: boolean = false
    ) : void {
        switch (this.mode) {
            default:
                return;
        }
    }

    public map(pointOption: (point: number[]) => number[]) : void {
        this.loopWithPoints(pointOption, true);
    }

    public forEach(pointOption: (point: number[]) => void) : void {
        this.loopWithPoints(pointOption);
    }
}
