/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */
import * as React from 'react';
import * as kanata from '../src';

const image = new kanata.ImageCore();
const url = '/base/testImages/x.jpg';

const maskImage = new kanata.ImageCore();
const maskUrl = '/base/testImages/mask.png';

const bgImage = new kanata.ImageCore();
const bgUrl = '/base/testImages/bg.jpg';

// declare const require: any;
// const {initialize} = require('./test.cpp');
// const initialize = require('./test.wasm');
// initialize({}).then((module) => {
  // console.log(module);
//   const result = module._roll_dice();
//   console.log(result);
// });
declare const Module: any;
const wasmColorInvert = Module._colorInvert;

declare const FILTER: any;
const canvas = document.createElement('canvas');

import * as GPU from 'gpu.js';
const gpu = new GPU();
const gpuColorInvert = gpu.createKernel(function(data) {
  return 255 - data[this.thread.x];
});

export default class ImageEx extends React.Component<any, any> {
  public state = {
    img: ''
  };

  public componentDidMount() {
    image.fromURL(url)
    .then(img => {
        this.setState({img: img.dataURL});
    });
  }

  private handleClick = () => image.fromURL(url)
    .then(async img => {
      // const im = new Image();
      // const processor = new FILTER.Image(im);
      // im.onload = () => {
      //   const processor = new FILTER.Image(im);
      //   const s = performance.now();
      //   processor.apply(new FILTER.AffineMatrixFilter().rotate(45 * Math.PI / 180));
      //   console.log('Performance', performance.now() - s);
      //   this.setState({img: processor.toImage()});
      // };
      // im.src = url;
      // console.log('colorInvert: size:', image.size);
      // const data = image.data;
      // const nByte = 1;

      // const s1 = performance.now();

      // const ptr = Module._malloc(data.length * nByte);
      // Module.HEAPU8.set(data, ptr / nByte);
      // const resPtr = Module._meanFilter(ptr, 2110, 1944, 3);
      // const pos = resPtr / nByte;
      // const resData = Module.HEAPU8.subarray(pos, pos + data.length);
      // Module._free(ptr);
      // image.data = resData;

      // console.log('Performance WASM', performance.now() - s1, resData);

      // const s2 = performance.now();

      // const res = gpuColorInvert.setOutput([data.length])(data);

      // console.log('Performance GPU', performance.now() - s2);

      // image.region = [100, 100, 400, 400];
      await maskImage.fromURL(maskUrl);
      await bgImage.fromURL(bgUrl);
      const s = performance.now();
      // image.apply(kanata.affineTransform(1, .1, 0, .1, 1, 0));
      // image.apply(kanata.mask(maskImage, bgImage));

      // const ck = new kanata.ConvolutionKernel([
      //   [1 / 9, 1 / 9, 1 / 9],
      //   [1 / 9, 1 / 9, 1 / 9],
      //   [1 / 9, 1 / 9, 1 / 9]
      // ]);
      // const ck = new kanata.ConvolutionKernel([
      //   [1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25],
      //   [1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25],
      //   [1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25],
      //   [1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25],
      //   [1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25]
      // ]);
      // image.apply(kanata.localFilter(ck));

      image.apply(kanata.meanFilter(3));
      // image.apply(kanata.rankFilter(3, 4));

      // image.apply(kanata.grayscale());
      // const thImage = kanata.clone(image);
      // thImage.apply(kanata.localFilter(ck));
      // image.apply(kanata.localThreshold(thImage));

      // image.apply(kanata.flip('all'));
      // image.apply(kanata.bitsCut(6, 7));
      // image.apply(kanata.contrastStretch(40, 40, 160, 160));
      // image.apply(kanata.grayLayered(40, 40, 160, 160, [0, 0, 0]));
      // image.apply(kanata.grayscale());
      // image.apply(kanata.globalThreshold(100));
      // image.apply(kanata.changeRegion([0, 0, 200, 200]));
      // image.apply(kanata.globalThreshold(80));
      // image.apply(kanata.translate([100, 100]));
      // image.apply(kanata.rotate(30 * Math.PI / 180, [image.width / 2, image.height / 2]));
      // kanata.shear(image, [.5, .5]);
      // image.exec();
      // kanata.colorInvert()(image);
      // kanata.scale(image, [.5, .5]);
      // kanata.crop(image, [10, 10, 100, 100]);
      // kanata.linearTransform(image, 20);
      // kanata.colorInvert(image);
      // kanata.globalThreshold(image, 100);
      console.log('Performance JS', performance.now() - s);
      img.pushDataBackToContext();
      this.setState({img: img.dataURL});
    });
    
  public render() {
    return (
      <div>
        <button onClick={this.handleClick}>haha</button>
        <img src={this.state.img} />
      </div>
    );
  }
}
