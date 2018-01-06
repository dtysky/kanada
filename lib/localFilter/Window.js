"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 4 Jan 2018
 * Description:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Window = /** @class */ (function () {
    function Window(image, size) {
        this._image = image;
        this._size = size;
        this._hsize = size >> 2;
        this._region = image.region;
        _a = image.size, this._width = _a[0], this._height = _a[1];
        this._data = image.imageData.data;
        this.start();
        var _a;
    }
    Object.defineProperty(Window.prototype, "done", {
        get: function () {
            return this._done;
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.start = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data;
        var _b = this._region, left = _b[0], top = _b[1];
        this._done = false;
        this._matrix = new Array(_size);
        this._x = left;
        this._y = top;
        this.initRow();
    };
    Window.prototype.next = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data;
        var _b = this._region, left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
        var newRow = false;
        if (this._x === right) {
            this._x = 0;
            this._y += 1;
            newRow = true;
        }
        else {
            this._x += 1;
        }
        if (this._x === right && this._y === bottom) {
            this._done = true;
        }
        var _c = this, _x = _c._x, _y = _c._y;
        if (newRow) {
            this.initRow();
        }
        else {
            var t = _y - _hsize;
            for (var my = 0; my < _size; my += 1) {
                var y = my + t;
                var channel = 0;
                if (!(_x > right || y > bottom)) {
                    var pos = (y * _width + _x) * 4;
                    channel = _data[pos];
                }
                this._matrix[my] = this._matrix[my].slice(1).concat([channel]);
            }
        }
        return { pos: (_y * _width + _x) * 4, window: this._matrix };
    };
    Window.prototype.initRow = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data, _x = _a._x, _y = _a._y;
        var _b = this._region, left = _b[0], top = _b[1];
        this._matrix = new Array(_size);
        var l = _x - _hsize - 1;
        var t = _y - _hsize - 1;
        for (var my = 0; my < _size; my += 1) {
            this._matrix[my] = new Array(_size);
            for (var mx = 0; mx < _size; mx += 1) {
                var x = mx + l;
                var y = my + t;
                if (x < left || y < top) {
                    this._matrix[my][mx] = 0;
                    continue;
                }
                var pos = (y * _width + x) * 4;
                this._matrix[my][mx] = _data[pos];
            }
        }
    };
    return Window;
}());
exports.Window = Window;
var Window3Channels = /** @class */ (function () {
    function Window3Channels(image, size) {
        this._image = image;
        this._size = size;
        this._hsize = size >> 2;
        this._region = image.region;
        _a = image.size, this._width = _a[0], this._height = _a[1];
        this._data = image.imageData.data;
        this.start();
        var _a;
    }
    Object.defineProperty(Window3Channels.prototype, "done", {
        get: function () {
            return this._done;
        },
        enumerable: true,
        configurable: true
    });
    Window3Channels.prototype.start = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data;
        var _b = this._region, left = _b[0], top = _b[1];
        this._done = false;
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        this._x = left;
        this._y = top;
        this.initRow();
    };
    Window3Channels.prototype.next = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data;
        var _b = this._region, left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
        var newRow = false;
        if (this._x === right) {
            this._x = 0;
            this._y += 1;
            newRow = true;
        }
        else {
            this._x += 1;
        }
        if (this._x === right && this._y === bottom) {
            this._done = true;
        }
        var _c = this, _x = _c._x, _y = _c._y;
        if (newRow) {
            this.initRow();
        }
        else {
            var t = _y - _hsize;
            for (var my = 0; my < _size; my += 1) {
                var y = my + t;
                var channel1 = 0;
                var channel2 = 0;
                var channel3 = 0;
                if (!(_x > right || y > bottom)) {
                    var pos = (y * _width + _x) * 4;
                    channel1 = _data[pos];
                    channel2 = _data[pos + 1];
                    channel3 = _data[pos + 2];
                }
                this._matrix1[my] = this._matrix1[my].slice(1).concat([channel1]);
                this._matrix2[my] = this._matrix2[my].slice(1).concat([channel2]);
                this._matrix3[my] = this._matrix3[my].slice(1).concat([channel3]);
            }
        }
        return { pos: (_y * _width + _x) * 4, window: [this._matrix1, this._matrix2, this._matrix3] };
    };
    Window3Channels.prototype.initRow = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data, _x = _a._x, _y = _a._y;
        var _b = this._region, left = _b[0], top = _b[1];
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        var l = _x - _hsize - 1;
        var t = _y - _hsize - 1;
        for (var my = 0; my < _size; my += 1) {
            this._matrix1[my] = new Array(_size);
            this._matrix2[my] = new Array(_size);
            this._matrix3[my] = new Array(_size);
            for (var mx = 0; mx < _size; mx += 1) {
                var x = mx + l;
                var y = my + t;
                if (x < left || y < top) {
                    this._matrix1[my][mx] = 0;
                    this._matrix2[my][mx] = 0;
                    this._matrix3[my][mx] = 0;
                    continue;
                }
                var pos = (y * _width + x) * 4;
                this._matrix1[my][mx] = _data[pos];
                this._matrix2[my][mx] = _data[pos + 1];
                this._matrix3[my][mx] = _data[pos + 2];
            }
        }
    };
    return Window3Channels;
}());
exports.Window3Channels = Window3Channels;
var Window4Channels = /** @class */ (function () {
    function Window4Channels(image, size) {
        this._image = image;
        this._size = size;
        this._hsize = size >> 2;
        this._region = image.region;
        _a = image.size, this._width = _a[0], this._height = _a[1];
        this._data = image.imageData.data;
        this.start();
        var _a;
    }
    Object.defineProperty(Window4Channels.prototype, "done", {
        get: function () {
            return this._done;
        },
        enumerable: true,
        configurable: true
    });
    Window4Channels.prototype.start = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data;
        var _b = this._region, left = _b[0], top = _b[1];
        this._done = false;
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        this._matrix4 = new Array(_size);
        this._x = left;
        this._y = top;
        this.initRow();
    };
    Window4Channels.prototype.next = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data;
        var _b = this._region, left = _b[0], top = _b[1], right = _b[2], bottom = _b[3];
        var newRow = false;
        if (this._x === right) {
            this._x = 0;
            this._y += 1;
            newRow = true;
        }
        else {
            this._x += 1;
        }
        if (this._x === right && this._y === bottom) {
            this._done = true;
        }
        var _c = this, _x = _c._x, _y = _c._y;
        if (newRow) {
            this.initRow();
        }
        else {
            var t = _y - _hsize;
            for (var my = 0; my < _size; my += 1) {
                var y = my + t;
                var channel1 = 0;
                var channel2 = 0;
                var channel3 = 0;
                var channel4 = 0;
                if (!(_x > right || y > bottom)) {
                    var pos = (y * _width + _x) * 4;
                    channel1 = _data[pos];
                    channel2 = _data[pos + 1];
                    channel3 = _data[pos + 2];
                    channel4 = _data[pos + 3];
                }
                this._matrix1[my] = this._matrix1[my].slice(1).concat([channel1]);
                this._matrix2[my] = this._matrix2[my].slice(1).concat([channel2]);
                this._matrix3[my] = this._matrix3[my].slice(1).concat([channel3]);
                this._matrix4[my] = this._matrix4[my].slice(1).concat([channel4]);
            }
        }
        return { pos: (_y * _width + _x) * 4, window: [this._matrix1, this._matrix2, this._matrix3] };
    };
    Window4Channels.prototype.initRow = function () {
        var _a = this, _size = _a._size, _hsize = _a._hsize, _image = _a._image, _width = _a._width, _height = _a._height, _data = _a._data, _x = _a._x, _y = _a._y;
        var _b = this._region, left = _b[0], top = _b[1];
        this._matrix1 = new Array(_size);
        this._matrix2 = new Array(_size);
        this._matrix3 = new Array(_size);
        this._matrix4 = new Array(_size);
        var l = _x - _hsize - 1;
        var t = _y - _hsize - 1;
        for (var my = 0; my < _size; my += 1) {
            this._matrix1[my] = new Array(_size);
            this._matrix2[my] = new Array(_size);
            this._matrix3[my] = new Array(_size);
            this._matrix4[my] = new Array(_size);
            for (var mx = 0; mx < _size; mx += 1) {
                var x = mx + l;
                var y = my + t;
                if (x < left || y < top) {
                    this._matrix1[my][mx] = 0;
                    this._matrix2[my][mx] = 0;
                    this._matrix3[my][mx] = 0;
                    this._matrix4[my][mx] = 0;
                    continue;
                }
                var pos = (y * _width + x) * 4;
                this._matrix1[my][mx] = _data[pos];
                this._matrix2[my][mx] = _data[pos + 1];
                this._matrix3[my][mx] = _data[pos + 2];
                this._matrix4[my][mx] = _data[pos + 3];
            }
        }
    };
    return Window4Channels;
}());
exports.Window4Channels = Window4Channels;
