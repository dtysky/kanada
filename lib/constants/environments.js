"use strict";
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: Environment variables.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Environments;
(function (Environments) {
    Environments.BROWSER_MODE = window !== undefined;
    Environments.DEV_MODE = process.env.NODE_ENV === 'development';
})(Environments = exports.Environments || (exports.Environments = {}));
