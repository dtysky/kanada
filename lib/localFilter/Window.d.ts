/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description:
 */
import { ImageCore } from '../core';
import { TMatrix, TRegion, TCoord } from '../constants';
export declare class Window {
    protected _image: ImageCore;
    protected _size: TCoord;
    protected _hsize: TCoord;
    protected _region: TRegion;
    protected _data: Uint8ClampedArray;
    protected _width: number;
    protected _height: number;
    protected _matrix: TMatrix;
    protected _x: TCoord;
    protected _y: TCoord;
    protected _done: boolean;
    constructor(image: ImageCore, size: number);
    readonly done: boolean;
    start(): void;
    next(): {
        pos: number;
        window: number[][];
    };
    protected initRow(): void;
}
export declare class Window3Channels {
    protected _image: ImageCore;
    protected _size: TCoord;
    protected _hsize: TCoord;
    protected _region: TRegion;
    protected _data: Uint8ClampedArray;
    protected _width: number;
    protected _height: number;
    protected _matrix1: TMatrix;
    protected _matrix2: TMatrix;
    protected _matrix3: TMatrix;
    protected _x: TCoord;
    protected _y: TCoord;
    protected _done: boolean;
    constructor(image: ImageCore, size: number);
    readonly done: boolean;
    start(): void;
    next(): {
        pos: number;
        window: number[][][];
    };
    protected initRow(): void;
}
export declare class Window4Channels {
    protected _image: ImageCore;
    protected _size: TCoord;
    protected _hsize: TCoord;
    protected _region: TRegion;
    protected _data: Uint8ClampedArray;
    protected _width: number;
    protected _height: number;
    protected _matrix1: TMatrix;
    protected _matrix2: TMatrix;
    protected _matrix3: TMatrix;
    protected _matrix4: TMatrix;
    protected _x: TCoord;
    protected _y: TCoord;
    protected _done: boolean;
    constructor(image: ImageCore, size: number);
    readonly done: boolean;
    start(): void;
    next(): {
        pos: number;
        window: number[][][];
    };
    protected initRow(): void;
}
