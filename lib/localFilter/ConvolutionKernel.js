"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description: Convolution kernel.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var ConvolutionKernel = /** @class */ (function () {
    function ConvolutionKernel(matrix) {
        var _this = this;
        var size = matrix.length;
        this._matrix = [];
        matrix.forEach(function (m) {
            if (m.length !== size) {
                throw new core_1.Exceptions.ArraySizeError('Size of children of matrix', matrix.length, "same as matrix: " + size);
            }
            // prepare for best performance while applying
            var nm = new (Array.bind.apply(Array, [void 0].concat(m)))();
            nm.reverse();
            _this._matrix.push(nm);
        });
        // prepare for best performance while applying
        // w[x - 1, y - 1]f(x + 1, y + 1) => w[x - 1, y - 1]g(x - 1, y - 1);
        this._matrix.reverse();
        this._size = size;
    }
    Object.defineProperty(ConvolutionKernel.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConvolutionKernel.prototype, "matrix", {
        get: function () {
            return this._matrix;
        },
        enumerable: true,
        configurable: true
    });
    ConvolutionKernel.prototype.apply = function (window) {
        if (window.length !== this._size) {
            throw new core_1.Exceptions.ArraySizeError('Size of window', window.length, "same as CK: " + this._size);
        }
        var _a = this, _size = _a._size, _matrix = _a._matrix;
        var res = 0;
        for (var x = 0; x < _size; x += 1) {
            for (var y = 0; y < _size; y += 1) {
                res += window[x][y] * _matrix[x][y];
            }
        }
        return res;
    };
    return ConvolutionKernel;
}());
exports.ConvolutionKernel = ConvolutionKernel;
