/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description:
 */

import {ImageCore} from '../core';
import {TMatrix, TRegion, TCoord} from '../constants';

export class Window {
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

    constructor(image: ImageCore, size: number) {
        this._image = image;
        this._size = size;
        this._hsize = size >> 2;
        this._region = image.region;
        [this._width, this._height] = image.size;
        this._data = image.imageData.data;
        this.start();
    }

    public get done(): boolean {
        return this._done;
    }

    public start() {
        const {_size, _hsize, _image, _width, _height, _data} = this;
        const [left, top] = this._region;
        this._done = false;
        this._matrix = new Array(_size);
        this._x = left;
        this._y = top;
        this.initRow();
    }

    public next() {
        const {
            _size, _hsize,
            _image, _width, _height,
            _data
        } = this;
        const [left, top, right, bottom] = this._region;

        let newRow = false;

        if (this._x === right) {
            this._x = 0;
            this._y += 1;
            newRow = true;
        } else {
            this._x += 1;
        }

        if (this._x === right && this._y === bottom) {
            this._done = true;
        }

        const {_x, _y} = this;

        if (newRow) {
            this.initRow();
        } else {
            const t = _y - _hsize;
            for (let my = 0; my < _size; my += 1) {
                const y = my + t;
                let channel = 0;
                if (!(_x > right || y > bottom)) {
                    const pos = (y * _width + _x) * 4;
                    channel = _data[pos];
                }
                this._matrix[my] = [...this._matrix[my].slice(1), channel];
            }
        }

        return {pos: (_y * _width + _x) * 4, window: this._matrix};
    }

    protected initRow() {
        const {
            _size, _hsize, _image, _width, _height, _data,
            _x, _y
        } = this;
        const [left, top] = this._region;
        this._matrix = new Array(_size);

        const l = _x - _hsize - 1;
        const t = _y - _hsize - 1;
        for (let my = 0; my < _size; my += 1) {
            this._matrix[my] = new Array(_size);
            for (let mx = 0; mx < _size; mx += 1) {
                const x = mx + l;
                const y = my + t;
                if (x < left || y < top) {
                    this._matrix[my][mx] = 0;
                    continue;
                }
                const pos = (y * _width + x) * 4;
                this._matrix[my][mx] = _data[pos];
            }
        }
    }
}

export class Window3Channels {
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

    constructor(image: ImageCore, size: number) {
        this._image = image;
        this._size = size;
        this._hsize = size >> 2;
        this._region = image.region;
        [this._width, this._height] = image.size;
        this._data = image.imageData.data;
        this.start();
    }

    public get done(): boolean {
        return this._done;
    }

    public start() {
        const {_size, _hsize, _image, _width, _height, _data} = this;
        const [left, top] = this._region;
        this._done = false;
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        this._x = left;
        this._y = top;
        this.initRow();
    }

    public next() {
        const {
            _size, _hsize,
            _image, _width, _height,
            _data
        } = this;
        const [left, top, right, bottom] = this._region;

        let newRow = false;

        if (this._x === right) {
            this._x = 0;
            this._y += 1;
            newRow = true;
        } else {
            this._x += 1;
        }

        if (this._x === right && this._y === bottom) {
            this._done = true;
        }

        const {_x, _y} = this;

        if (newRow) {
            this.initRow();
        } else {
            const t = _y - _hsize;
            for (let my = 0; my < _size; my += 1) {
                const y = my + t;
                let channel1 = 0;
                let channel2 = 0;
                let channel3 = 0;
                if (!(_x > right || y > bottom)) {
                    const pos = (y * _width + _x) * 4;
                    channel1 = _data[pos];
                    channel2 = _data[pos + 1];
                    channel3 = _data[pos + 2];
                }
                this._matrix1[my] = [...this._matrix1[my].slice(1), channel1];
                this._matrix2[my] = [...this._matrix2[my].slice(1), channel2];
                this._matrix3[my] = [...this._matrix3[my].slice(1), channel3];
            }
        }

        return {pos: (_y * _width + _x) * 4, window: [this._matrix1, this._matrix2, this._matrix3]};
    }

    protected initRow() {
        const {
            _size, _hsize, _image, _width, _height, _data,
            _x, _y
        } = this;
        const [left, top] = this._region;
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);

        const l = _x - _hsize - 1;
        const t = _y - _hsize - 1;
        for (let my = 0; my < _size; my += 1) {
            this._matrix1[my] = new Array(_size);
            this._matrix2[my] = new Array(_size);
            this._matrix3[my] = new Array(_size);
            for (let mx = 0; mx < _size; mx += 1) {
                const x = mx + l;
                const y = my + t;
                if (x < left || y < top) {
                    this._matrix1[my][mx] = 0;
                    this._matrix2[my][mx] = 0;
                    this._matrix3[my][mx] = 0;
                    continue;
                }
                const pos = (y * _width + x) * 4;
                this._matrix1[my][mx] = _data[pos];
                this._matrix2[my][mx] = _data[pos + 1];
                this._matrix3[my][mx] = _data[pos + 2];
            }
        }
    }
}

export class Window4Channels {
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

    constructor(image: ImageCore, size: number) {
        this._image = image;
        this._size = size;
        this._hsize = size >> 2;
        this._region = image.region;
        [this._width, this._height] = image.size;
        this._data = image.imageData.data;
        this.start();
    }

    public get done(): boolean {
        return this._done;
    }

    public start() {
        const {_size, _hsize, _image, _width, _height, _data} = this;
        const [left, top] = this._region;
        this._done = false;
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        this._matrix4 = new Array(_size);
        this._x = left;
        this._y = top;
        this.initRow();
    }

    public next() {
        const {
            _size, _hsize,
            _image, _width, _height,
            _data
        } = this;
        const [left, top, right, bottom] = this._region;

        let newRow = false;

        if (this._x === right) {
            this._x = 0;
            this._y += 1;
            newRow = true;
        } else {
            this._x += 1;
        }

        if (this._x === right && this._y === bottom) {
            this._done = true;
        }

        const {_x, _y} = this;

        if (newRow) {
            this.initRow();
        } else {
            const t = _y - _hsize;
            for (let my = 0; my < _size; my += 1) {
                const y = my + t;
                let channel1 = 0;
                let channel2 = 0;
                let channel3 = 0;
                let channel4 = 0;
                if (!(_x > right || y > bottom)) {
                    const pos = (y * _width + _x) * 4;
                    channel1 = _data[pos];
                    channel2 = _data[pos + 1];
                    channel3 = _data[pos + 2];
                    channel4 = _data[pos + 3];
                }
                this._matrix1[my] = [...this._matrix1[my].slice(1), channel1];
                this._matrix2[my] = [...this._matrix2[my].slice(1), channel2];
                this._matrix3[my] = [...this._matrix3[my].slice(1), channel3];
                this._matrix4[my] = [...this._matrix4[my].slice(1), channel4];
            }
        }

        return {pos: (_y * _width + _x) * 4, window: [this._matrix1, this._matrix2, this._matrix3]};
    }

    protected initRow() {
        const {
            _size, _hsize, _image, _width, _height, _data,
            _x, _y
        } = this;
        const [left, top] = this._region;
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        this._matrix4 = new Array(_size);

        const l = _x - _hsize - 1;
        const t = _y - _hsize - 1;
        for (let my = 0; my < _size; my += 1) {
            this._matrix1[my] = new Array(_size);
            this._matrix2[my] = new Array(_size);
            this._matrix3[my] = new Array(_size);
            this._matrix4[my] = new Array(_size);
            for (let mx = 0; mx < _size; mx += 1) {
                const x = mx + l;
                const y = my + t;
                if (x < left || y < top) {
                    this._matrix1[my][mx] = 0;
                    this._matrix2[my][mx] = 0;
                    this._matrix3[my][mx] = 0;
                    this._matrix4[my][mx] = 0;
                    continue;
                }
                const pos = (y * _width + x) * 4;
                this._matrix1[my][mx] = _data[pos];
                this._matrix2[my][mx] = _data[pos + 1];
                this._matrix3[my][mx] = _data[pos + 2];
                this._matrix4[my][mx] = _data[pos + 3];
            }
        }
    }
}
