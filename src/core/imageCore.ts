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
    private _origin: {
        data: Uint8ClampedArray,
        mode: TColorSpace
    };
    private _region: TRegion;
    private _operations: TOperate[];
    // a flag for push back data to context lazily
    public dataIsModified: boolean;
    // a flag for checking if data has been normalized in 'L' and 'B' mode
    public dataIsNormalized: boolean;

    constructor(
        mode: TColorSpace = <TColorSpace>'RGBA',
        canvas?: HTMLCanvasElement
    ) {
        this._mode = mode;
        this._canvas = canvas || document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._data = new ImageData(1, 1);
        this._origin = {
            data: new Uint8ClampedArray(this._data.data),
            mode: mode
        };
        this._operations = [];
        this.region = [0, 0, 0, 0];
        this.dataIsModified = false;
        this.dataIsNormalized = true;
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

    public set data(data: Uint8ClampedArray) {
        this._data.data.set(data);
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
        if (region[2] < region[0] || region[3] < region[1]) {
            throw new Exceptions.RegionSizeError('right or top', region, 'right >= left and bottom >= top');
        }
        this._region = [region[0], region[1], region[2], region[3]];
        this.normalizeData();
    }

    public get region(): TRegion {
        const region = this._region;
        return [region[0], region[1], region[2], region[3]];
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
        this.dataIsModified = false;
        this.dataIsNormalized = true;
        return this;
    }

    public fromBuffer(
        size: TImageSize,
        buffer: TBuffer,
        mode?: TColorSpace
    ): ImageCore {
        if (size[0] * size[1] << 2 !== buffer.length) {
            throw new Exceptions.BufferSizeError(buffer.length, size[0] * size[1] << 2);
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
        this.dataIsModified = false;
        this.dataIsNormalized = true;
        return this;
    }

    public fromColor(color: TPixel = [0, 0, 0, 0], size: TImageSize = [512, 512]) {
        if (color.length !== 4) {
            throw new Exceptions.ArraySizeError('Create an image from color', color.length, 4);
        }
        const canvas = this._canvas;
        canvas.width = size[0];
        canvas.height = size[1];
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = `rgba(${color.join(',')})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
        this._context = context;
        this._data = context.getImageData(0, 0, canvas.width, canvas.height);
        this._mode = 'RGBA';
        this.region = [0, 0, canvas.width, canvas.height];
        this.dataIsModified = false;
        this.dataIsNormalized = true;
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
        return this.fromBuffer(image.size, image.data, image.mode);
    }

    public save() {
        this._origin = {
            data: new Uint8ClampedArray(this._data.data),
            mode: this._mode
        };
    };

    public restore() {
        const {data, mode} = this._origin;
        this._data.data.set(data);
        this._mode = mode;
    }

    public changeMode(
        mode: TColorSpace
    ): ImageCore {
        this._mode = mode;
        return this;
    }

    public normalizeData() {
        if (this.dataIsNormalized) {
            return;
        }
        if (this._mode === 'L' || this._mode === 'B') {
            const [left, top, right, bottom] = this._region;
            const [width, height] = this.size;
            this.modifyData(data => {
                for (let y = top; y < bottom; y += 1) {
                    for (let x = left; x < right; x += 1) {
                        const pos = (x + y * width) << 2;
                        data[pos + 1] = data[pos];
                        data[pos + 2] = data[pos];
                    }
                }
            });
            this.changeMode('RGBA');
        }
        this.dataIsNormalized = true;
    }

    public pushDataBackToContext() {
        this.normalizeData();
        this.dataIsModified = false;
        this._context.putImageData(this._data, 0, 0);
    }

    public modifyData(
        imageOption: (data: Uint8ClampedArray, size: TImageSize, region: TRegion) => void | Uint8ClampedArray
    ): ImageCore {
        const mode = this._mode;
        const data = imageOption(this._data.data, this.size, this._region);
        if (data) {
            this._data.data.set(data);
        }
        if (this._mode === 'L' || this._mode === 'B') {
            this.dataIsNormalized = false;
        }
        this.dataIsModified = true;
        return this;
    }

    public modifyValidPixels(
        pixelOption: (data: Uint8ClampedArray, pos: number) => void | Uint8ClampedArray
    ): ImageCore {
        const mode = this._mode;
        const [left, top, right, bottom] = this._region;
        const [width, height] = this.size;
        const data = this._data.data;
        for (let y = top; y < bottom; y += 1) {
            for (let x = left; x < right; x += 1) {
                pixelOption(data, (x + y * width) << 2);
            }
        }
        if (this._mode === 'L' || this._mode === 'B') {
            this.dataIsNormalized = false;
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

    public pipe(operate: TOperate) {
        this._operations.push(operate);
        return this;
    }

    public remove(operate: TOperate) {
        this._operations.splice(this._operations.indexOf(operate), 1);
        return this;
    }

    public clear() {
        this._operations = [];
        return this;
    }

    public apply(operate: TOperate) {
        operate(this);
        return this;
    }

    public exec() {
        this._operations.forEach(operate => operate(this));
        return this;
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
