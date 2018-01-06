/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description: Convolution kernel.
 */

import {Exceptions} from '../core';
import {TMatrix} from '../constants';

export class ConvolutionKernel {
    private _size: number;
    private _matrix: TMatrix;

    constructor(matrix: TMatrix) {
        const size = matrix.length;
        this._matrix = [];
        matrix.forEach((m: number[]) => {
            if (m.length !== size) {
                throw new Exceptions.ArraySizeError('Size of children of matrix', matrix.length, `same as matrix: ${size}`);
            }
            // prepare for best performance while applying
            const nm = new Array(...m);
            nm.reverse();
            this._matrix.push(nm);
        });
        // prepare for best performance while applying
        // w[x - 1, y - 1]f(x + 1, y + 1) => w[x - 1, y - 1]g(x - 1, y - 1);
        this._matrix.reverse();
        this._size = size;
    }

    public get size(): number {
        return this._size;
    }

    public get matrix(): TMatrix {
        return this._matrix;
    }

    public apply(window: TMatrix) {
        if (window.length !== this._size) {
            throw new Exceptions.ArraySizeError('Size of window', window.length, `same as CK: ${this._size}`);
        }
        const {_size, _matrix} = this;
        let res = 0;
        for (let x = 0; x < _size; x += 1) {
            for (let y = 0; y < _size; y += 1) {
                res += window[x][y] * _matrix[x][y];
            }
        }
        return res;
    }
}
