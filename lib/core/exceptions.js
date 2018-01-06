"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/18
 * Description: a set of errors.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exceptions;
(function (Exceptions) {
    var BaseError = /** @class */ (function (_super) {
        __extends(BaseError, _super);
        function BaseError(name, message) {
            if (name === void 0) { name = 'BaseError'; }
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.stack = (new Error()).stack;
            _this.message = message;
            return _this;
        }
        return BaseError;
    }(Error));
    Exceptions.BaseError = BaseError;
    var ColorSpaceError = /** @class */ (function (_super) {
        __extends(ColorSpaceError, _super);
        function ColorSpaceError(paramName, currentSpace) {
            var expectedSpace = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                expectedSpace[_i - 2] = arguments[_i];
            }
            return _super.call(this, 'ColorSpaceError', "Color space is error, " + paramName + " couldn't be '" + currentSpace + "', expect '" + expectedSpace.join(' or ') + "'.") || this;
        }
        return ColorSpaceError;
    }(BaseError));
    Exceptions.ColorSpaceError = ColorSpaceError;
    var InvalidImagePathError = /** @class */ (function (_super) {
        __extends(InvalidImagePathError, _super);
        function InvalidImagePathError(path) {
            return _super.call(this, 'InvalidImagePathError', "Image which has path '" + path + "' is invalid, check your url !") || this;
        }
        return InvalidImagePathError;
    }(BaseError));
    Exceptions.InvalidImagePathError = InvalidImagePathError;
    var BufferSizeError = /** @class */ (function (_super) {
        __extends(BufferSizeError, _super);
        function BufferSizeError(currentSize, expectedSize) {
            return _super.call(this, 'BufferSizeError', "Buffer's size is error, expect '" + expectedSize + "' but current is '" + currentSize + "'.") || this;
        }
        return BufferSizeError;
    }(BaseError));
    Exceptions.BufferSizeError = BufferSizeError;
    var ArraySizeError = /** @class */ (function (_super) {
        __extends(ArraySizeError, _super);
        function ArraySizeError(paramName, currentSize, expectedSize) {
            return _super.call(this, 'ArraySizeError', "Size of array is error, the size of " + paramName + " couldn't be '" + currentSize + "', expect '" + expectedSize + "'.") || this;
        }
        return ArraySizeError;
    }(BaseError));
    Exceptions.ArraySizeError = ArraySizeError;
    var RegionSizeError = /** @class */ (function (_super) {
        __extends(RegionSizeError, _super);
        function RegionSizeError(paramName, current, expect) {
            return _super.call(this, 'RegionSizeError', "Size of region is error, the size of " + paramName + " couldn't be '" + current + "', expect '" + expect + "'.") || this;
        }
        return RegionSizeError;
    }(BaseError));
    Exceptions.RegionSizeError = RegionSizeError;
    var SizeError = /** @class */ (function (_super) {
        __extends(SizeError, _super);
        function SizeError(paramName, current, expect) {
            return _super.call(this, 'SizeError', "Size is error, the size of " + paramName + " couldn't be '" + current + "', expect '" + expect + "'.") || this;
        }
        return SizeError;
    }(BaseError));
    Exceptions.SizeError = SizeError;
})(Exceptions = exports.Exceptions || (exports.Exceptions = {}));
