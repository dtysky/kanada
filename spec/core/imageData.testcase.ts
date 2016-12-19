/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/12/19
 * Description: image data for testing.
 */

const white20x20Array = [];
for (let i = 0; i < 1600; i += 1) {
    white20x20Array.push(255);
}
export const white20x20 = new Uint8ClampedArray(white20x20Array);

const black20x20Array = [];
for (let i = 0; i < 1600; i += 1) {
    black20x20Array.push(0);
}
export const black20x20 = new Uint8ClampedArray(black20x20Array);
