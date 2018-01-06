"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: core data structure for image.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var exceptions_1 = require("./exceptions");
var ImageCore = /** @class */ (function () {
    function ImageCore(mode, canvas) {
        if (mode === void 0) { mode = 'RGBA'; }
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
    Object.defineProperty(ImageCore.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "width", {
        get: function () {
            return this._data.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "height", {
        get: function () {
            return this._data.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "size", {
        get: function () {
            return [this._data.width, this._data.height];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "data", {
        get: function () {
            // to avoid changing private data
            return new Uint8ClampedArray(this._data.data);
        },
        set: function (data) {
            this._data.data.set(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "imageData", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "dataURL", {
        get: function () {
            return this._canvas.toDataURL();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCore.prototype, "region", {
        get: function () {
            return this._region;
        },
        set: function (region) {
            if (region[2] < region[0] || region[3] < region[1]) {
                throw new exceptions_1.Exceptions.RegionSizeError('right or top', region, 'right >= left and bottom >= top');
            }
            this._region = region;
            this.normalizeData();
        },
        enumerable: true,
        configurable: true
    });
    ImageCore.prototype.fromElement = function (element) {
        // if (this._mode !== 'RGBA') {
        //     throw new Exceptions.ColorSpaceError('the mode of image', this._mode, 'RGBA');
        // }
        this._mode = 'RGBA';
        var canvas = this._canvas;
        canvas.width = element.width;
        canvas.height = element.height;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(element, 0, 0, canvas.width, canvas.height);
        this._context = context;
        this._data = context.getImageData(0, 0, element.width, element.height);
        this.region = [0, 0, canvas.width, canvas.height];
        this.dataIsModified = false;
        this.dataIsNormalized = true;
        return this;
    };
    ImageCore.prototype.fromBuffer = function (size, buffer, mode) {
        if (size[0] * size[1] << 2 !== buffer.length) {
            throw new exceptions_1.Exceptions.BufferSizeError(buffer.length, size[0] * size[1] << 2);
        }
        var canvas = this._canvas;
        canvas.width = size[0];
        canvas.height = size[1];
        var context = canvas.getContext('2d');
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
    };
    ImageCore.prototype.fromColor = function (color, size) {
        if (color === void 0) { color = [0, 0, 0, 0]; }
        if (size === void 0) { size = [512, 512]; }
        if (color.length !== 4) {
            throw new exceptions_1.Exceptions.ArraySizeError('Create an image from color', color.length, 4);
        }
        var canvas = this._canvas;
        canvas.width = size[0];
        canvas.height = size[1];
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(" + color.join(',') + ")";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this._context = context;
        this._data = context.getImageData(0, 0, canvas.width, canvas.height);
        this._mode = 'RGBA';
        this.region = [0, 0, canvas.width, canvas.height];
        this.dataIsModified = false;
        this.dataIsNormalized = true;
        return this;
    };
    ImageCore.prototype.fromURL = function (url) {
        // if (this._mode !== 'RGBA') {
        //     return new Promise((resolve, reject) =>
        //         reject(new Exceptions.ColorSpaceError('the mode of image', this._mode, 'RGBA'))
        //     );
        // }
        return constants_1.Environments.BROWSER_MODE
            ? this._getDataInBrowser(url)
            : this._getDataInNode(url);
    };
    ImageCore.prototype._getDataInBrowser = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = function () {
                resolve(_this.fromElement(image));
            };
            image.onerror = function () {
                _this._data = new ImageData(1, 1);
                reject(new exceptions_1.Exceptions.InvalidImagePathError(url));
            };
            image.src = url;
        });
    };
    ImageCore.prototype._getDataInNode = function (url) {
        return new Promise(function (resolve, reject) { return resolve(); });
    };
    ImageCore.prototype.copy = function (image) {
        return this.fromBuffer(image.size, image.data, image.mode);
    };
    ImageCore.prototype.save = function () {
        this._origin = {
            data: new Uint8ClampedArray(this._data.data),
            mode: this._mode
        };
    };
    ;
    ImageCore.prototype.restore = function () {
        var _a = this._origin, data = _a.data, mode = _a.mode;
        this._data.data.set(data);
        this._mode = mode;
    };
    ImageCore.prototype.changeMode = function (mode) {
        this._mode = mode;
        return this;
    };
    ImageCore.prototype.normalizeData = function () {
        if (this.dataIsNormalized) {
            return;
        }
        if (this._mode === 'L' || this._mode === 'B') {
            var _a = this._region, left_1 = _a[0], top_1 = _a[1], right_1 = _a[2], bottom_1 = _a[3];
            var _b = this.size, width_1 = _b[0], height = _b[1];
            this.modifyData(function (data) {
                for (var y = top_1; y < bottom_1; y += 1) {
                    for (var x = left_1; x < right_1; x += 1) {
                        var pos = (x + y * width_1) << 2;
                        data[pos + 1] = data[pos];
                        data[pos + 2] = data[pos];
                    }
                }
            });
            this.changeMode('RGBA');
        }
        this.dataIsNormalized = true;
    };
    ImageCore.prototype.pushDataBackToContext = function () {
        this.normalizeData();
        this.dataIsModified = false;
        this._context.putImageData(this._data, 0, 0);
    };
    ImageCore.prototype.modifyData = function (imageOption) {
        var mode = this._mode;
        var data = imageOption(this._data.data, this.size, this._region);
        if (data) {
            this._data.data.set(data);
        }
        if (this._mode === 'L' || this._mode === 'B') {
            this.dataIsNormalized = false;
        }
        this.dataIsModified = true;
        return this;
    };
    ImageCore.prototype.modifyValidPixels = function (pixelOption) {
        var mode = this._mode;
        var _a = this._region, left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
        var _b = this.size, width = _b[0], height = _b[1];
        var data = this._data.data;
        for (var y = top; y < bottom; y += 1) {
            for (var x = left; x < right; x += 1) {
                pixelOption(data, (x + y * width) << 2);
            }
        }
        if (this._mode === 'L' || this._mode === 'B') {
            this.dataIsNormalized = false;
        }
        this.dataIsModified = true;
        return this;
    };
    ImageCore.prototype.setPixel = function (x, y, pixel) {
        var start = (this._data.width * y + x) * constants_1.PIXEL_SIZE[this._mode];
        this._data.data.set(new Uint8ClampedArray(pixel), start);
        return this;
    };
    ImageCore.prototype.getPixel = function (x, y) {
        var start = (this._data.width * y + x) * constants_1.PIXEL_SIZE[this._mode];
        return this._data.data.subarray(start, start + constants_1.PIXEL_SIZE[this._mode]);
    };
    ImageCore.prototype._loopWithPoints = function (option) {
        var size = this.data.length;
        var rowSize = this._data.width - 1;
        var x = 0;
        var y = 0;
        if (option.kind === 'map') {
            for (var pos = 0; pos < size; pos += 4) {
                this._data.data.set(option.pointOption(this._data.data.subarray(pos, pos + constants_1.PIXEL_SIZE[this._mode]), [x, y]), pos);
                y = x === rowSize ? y + 1 : y;
                x = x === rowSize ? 0 : x + 1;
            }
        }
        else {
            for (var pos = 0; pos < size; pos += 4) {
                option.pointOption(this._data.data.subarray(pos, pos + constants_1.PIXEL_SIZE[this._mode]), [x, y]);
                y = x === rowSize ? y + 1 : y;
                x = x === rowSize ? 0 : x + 1;
            }
        }
    };
    ImageCore.prototype.pipe = function (operate) {
        this._operations.push(operate);
        return this;
    };
    ImageCore.prototype.remove = function (operate) {
        this._operations.splice(this._operations.indexOf(operate), 1);
        return this;
    };
    ImageCore.prototype.clear = function () {
        this._operations = [];
        return this;
    };
    ImageCore.prototype.apply = function (operate) {
        operate(this);
        return this;
    };
    ImageCore.prototype.exec = function () {
        var _this = this;
        this._operations.forEach(function (operate) { return operate(_this); });
        return this;
    };
    ImageCore.prototype.map = function (pointOption) {
        this._loopWithPoints({ pointOption: pointOption, kind: 'map' });
        this.dataIsModified = true;
        return this;
    };
    ImageCore.prototype.forEach = function (pointOption) {
        this._loopWithPoints({ pointOption: pointOption, kind: 'forEach' });
        return this;
    };
    return ImageCore;
}());
exports.default = ImageCore;
