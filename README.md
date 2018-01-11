# kanata
A modern library for image processing on web with pure typescript.

>Note: This library is not completed, but some operations are already done.

## Demo

[You can check the live demo here.](http://kanata.dtysky.moe)

## Install

```bash
npm install kanata
```

## Usage

```ts
// new image
const image = new kanata.ImageCore();
// load image
image.fromURL / image.fromElement / image.fromBuffer...;
// apply operations
kanata.grayscale()(image);
// or
image.apply(kanata.grayscale());
// or
image.pipe(kanata.grayscale()).pipe(kanata.colorInvert());
image.exec();
```

## Completed

### Core

1. ImageCore

### Point operations

1. grayscale
2. bitsCut
3. ColorInvert
4. colorSpaceConvert
5. contrastStretch
6. gammaTransform
7. globalThreshold
8. grayLayered
9. linearTransform
10. logTransform
11. mask

### Geometry operations

1. affineTransform
2. crop
3. flip
4. rotate
5. scale
6. skew
7. translate
### Local filters

1. convolutionFilter
2. meanFilter
3. rankFilter
4. localThreshold
5. morphologicalFilter

### Histogram

### Utils

1. changeRegion
2. clone

## Features

1. More operations.
2. Worker.
3. Documents
4. Unit tests.
5. Benchmarks.
6. A faster version with webassembly.
