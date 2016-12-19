/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: Environment variables.
 */

export namespace Environments {
    export const BROWSER_MODE: boolean = window !== undefined;
    export const DEV_MODE: boolean = process.env.NODE_ENV === 'development';
}
