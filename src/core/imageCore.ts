/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */

import {
    TColorSpace, TImageSize, TPixel, TCoord, TPosition, TBuffer,
    PIXEL_SIZE, Environments, TRegion
} from '../constants';
import {Exceptions} from './exceptions';

export type TOperate = (image: ImageCore) => ImageCore;

export default class ImageCore {
    private _mode: TColorSpace;
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _data: ImageData;
    private _region: TRegion;
    private _operations: TOperate[];
    // a flag for push back data to context lazily
    public dataIsModified: boolean;

    constructor(
        mode: TColorSpace = <TColorSpace>'RGBA'
    ) {
        this._mode = mode;
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._data = new ImageData(1, 1);
        this.region = [0, 0, 0, 0];
        this._operations = [];
        this.dataIsModified = false;
    }

    public get mode(): TColorSpace {
        return this._mode;
    }

    public get width(): number {
        return this._data.width;
    }

    public get height(): number {
        return this._data.height;
    }

    public get size(): TImageSize {
        return [this._data.width, this._data.height];
    }

    public get data(): TBuffer {
        // to avoid changing private data
        return new Uint8ClampedArray(this._data.data);
    }

    public get imageData(): ImageData {
        return this._data;
    }

    public get dataURL(): string {
        return this._canvas.toDataURL();
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public set region(region: TRegion) {
        this._region = region;
    }

    public get region(): TRegion {
        return this._region;
    }

    public fromElement(
        element: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
    ): ImageCore {
        // if (this._mode !== 'RGBA') {
        //     throw new Exceptions.ColorSpaceError('the mode of image', this._mode, 'RGBA');
        // }
        this._mode = 'RGBA';
        const canvas = this._canvas;
        canvas.width = element.width;
        canvas.height = element.height;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(element, 0, 0, canvas.width, canvas.height);
        this._context = context;
        this._data = context.getImageData(0, 0, element.width, element.height);
        this.region = [0, 0, canvas.width, canvas.height];
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
        const canvas = this._canvas;
        canvas.width = size[0];
        canvas.height = size[1];
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        this._data = context.getImageData(0, 0, canvas.width, canvas.height);
        this._data.data.set(buffer, 0);
        context.putImageData(this._data, 0, 0);
        this._context = context;
        this._mode = mode || this._mode;
        this.region = [0, 0, canvas.width, canvas.height];
        return this;
    }

    public fromURL(
        url: string
    ): Promise<ImageCore> {
        // if (this._mode !== 'RGBA') {
        //     return new Promise((resolve, reject) =>
        //         reject(new Exceptions.ColorSpaceError('the mode of image', this._mode, 'RGBA'))
        //     );
        // }
        return Environments.BROWSER_MODE
            ? this._getDataInBrowser(url)
            : this._getDataInNode(url);
    }

    private _getDataInBrowser(
        url: string
    ) : Promise<ImageCore> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(this.fromElement(image));
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

    public normalizeData() {
        if (this._mode === 'L' || this._mode === 'B') {
            const [left, top, right, bottom] = this._region;
            const [width, height] = this.size;
            this.modifyData((data) => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) * 4;
                        data[pos + 1] = data[pos];
                        data[pos + 2] = data[pos];
                    }
                }
            });
        }
        this.dataIsModified = false;
    }

    public pushDataBackToContext() {
        this.normalizeData();
        this._context.putImageData(this._data, 0, 0);
    }

    public modifyData(
        imageOption: (data: Uint8ClampedArray, size: TImageSize, region: TRegion) => void | Uint8ClampedArray
    ): ImageCore {
        const data = imageOption(this._data.data, this.size, this._region);
        if (data) {
            this._data.data.set(data);
        }
        this.dataIsModified = true;
        return this;
    }

    public modifyValidPixels(
        pixelOption: (data: Uint8ClampedArray, pos: number) => void | Uint8ClampedArray
    ): ImageCore {
        const [left, top, right, bottom] = this._region;
        const [width, height] = this.size;
        const data = this._data.data;
        for (let y = top; y < bottom; y += 1) {
            for (let x = left; x < right; x += 1) {
                pixelOption(data, (x + y * width) * 4);
            }
        }
        this.dataIsModified = true;
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

    private _loopWithPoints(option: {
            pointOption: (pixel: TPixel, position: TPosition) => TPixel,
            kind: 'map'
        } | {
            pointOption: (pixel: TPixel, position: TPosition) => void,
            kind: 'forEach'
        }
    ) : void {
        const size = this.data.length;
        const rowSize = this._data.width - 1;
        let x = 0;
        let y = 0;
        if (option.kind === 'map') {
            for (let pos = 0; pos < size; pos += 4) {
                this._data.data.set(
                    option.pointOption(this._data.data.subarray(pos, pos + PIXEL_SIZE[this._mode]), [x, y]),
                    pos
                );
                y = x === rowSize ? y + 1 : y;
                x = x === rowSize ? 0 : x + 1;
            }
        } else {
            for (let pos = 0; pos < size; pos += 4) {
                option.pointOption(this._data.data.subarray(pos, pos + PIXEL_SIZE[this._mode]), [x, y]);
                y = x === rowSize ? y + 1 : y;
                x = x === rowSize ? 0 : x + 1;
            }
        }
    }

    public add(operate: TOperate) {
        this._operations.push(operate);
    }

    public remove(operate: TOperate) {
        this._operations.splice(this._operations.indexOf(operate), 1);
    }

    public clear() {
        this._operations = [];
    }

    public apply(operate: TOperate) {
        operate(this);
    }

    public exec() {
        this._operations.forEach(operate => operate(this));
    }

    public map(
        pointOption: (pixel: TPixel, position: TPosition) => TPixel
    ) : ImageCore {
        this._loopWithPoints({pointOption, kind: 'map'});
        this.dataIsModified = true;
        return this;
    }

    public forEach(
        pointOption: (ppixel: TPixel, position: TPosition) => void
    ) : ImageCore {
        this._loopWithPoints({pointOption, kind: 'forEach'});
        return this;
    }
}
