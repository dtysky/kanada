/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */
import { TColorSpace, TImageSize, TPixel, TCoord, TPosition, TBuffer, TRegion } from '../constants';
export declare type TOperate = (image: ImageCore) => ImageCore;
export default class ImageCore {
    private _mode;
    private _canvas;
    private _context;
    private _data;
    private _origin;
    private _region;
    private _operations;
    dataIsModified: boolean;
    dataIsNormalized: boolean;
    constructor(mode?: TColorSpace, canvas?: HTMLCanvasElement);
    readonly mode: TColorSpace;
    readonly width: number;
    readonly height: number;
    readonly size: TImageSize;
    data: Uint8ClampedArray;
    readonly imageData: ImageData;
    readonly dataURL: string;
    readonly canvas: HTMLCanvasElement;
    region: TRegion;
    fromElement(element: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): ImageCore;
    fromBuffer(size: TImageSize, buffer: TBuffer, mode?: TColorSpace): ImageCore;
    fromColor(color?: TPixel, size?: TImageSize): this;
    fromURL(url: string): Promise<ImageCore>;
    private _getDataInBrowser(url);
    private _getDataInNode(url);
    copy(image: ImageCore): ImageCore;
    save(): void;
    restore(): void;
    changeMode(mode: TColorSpace): ImageCore;
    normalizeData(): void;
    pushDataBackToContext(): void;
    modifyData(imageOption: (data: Uint8ClampedArray, size: TImageSize, region: TRegion) => void | Uint8ClampedArray): ImageCore;
    modifyValidPixels(pixelOption: (data: Uint8ClampedArray, pos: number) => void | Uint8ClampedArray): ImageCore;
    setPixel(x: TCoord, y: TCoord, pixel: TPixel): ImageCore;
    getPixel(x: TCoord, y: TCoord): TPixel;
    private _loopWithPoints(option);
    pipe(operate: TOperate): this;
    remove(operate: TOperate): this;
    clear(): this;
    apply(operate: TOperate): this;
    exec(): this;
    map(pointOption: (pixel: TPixel, position: TPosition) => TPixel): ImageCore;
    forEach(pointOption: (ppixel: TPixel, position: TPosition) => void): ImageCore;
}
