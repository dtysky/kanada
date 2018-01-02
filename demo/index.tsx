/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 19 Dec 2017
 * Description:
 */
import * as React from 'react';
import {render, findDOMNode} from 'react-dom';

import * as kanata from '../src';

const image = new kanata.ImageCore();
const url = '/base/testImages/x.jpg';

const vImage = new kanata.ImageCore();
const vUrl = '/base/testImages/x.mp4';

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

class Main extends React.Component<any, any> {
  public state = {
    img: ''
  };
  private video: HTMLVideoElement;
  private ctx: CanvasRenderingContext2D;

  public componentDidMount() {
    image.fromURL(url)
    .then(img => {
        this.setState({img: img.dataURL});
    });
  }

  private handleClick = () => image.fromURL(url)
    .then(img => {
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
      // const resPtr = wasmColorInvert(ptr, data.length / nByte);
      // const pos = resPtr / nByte;
      // const resData = Module.HEAPU8.subarray(pos, pos + data.length);
      // Module._free(ptr);

      // console.log('Performance WASM', performance.now() - s1);

      // const s2 = performance.now();

      // const res = gpuColorInvert.setOutput([data.length])(data);

      // console.log('Performance GPU', performance.now() - s2);

      image.region = [100, 100, 400, 400];
      const s = performance.now();
      // image.apply(kanata.contrastStretch(40, 40, 160, 160));
      image.apply(kanata.grayLayered(40, 40, 160, 160, [0, 0, 0]));
      image.apply(kanata.grayscale());
      image.apply(kanata.globalThreshold(100));
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

  private handlePlay = () => {
    const video = findDOMNode(this.refs.video) as HTMLVideoElement;
    const canvas = findDOMNode(this.refs.canvas) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    this.ctx = ctx;
    this.video = video;
    vImage.add(kanata.contrastStretch(40, 40, 160, 160));
    this.update();
    video.play();
  }

  private update = () => {
    // const s = performance.now();
    vImage.fromElement(this.video);
    vImage.exec();
    // vImage.pushDataBackToContext();
    vImage.normalizeData();
    this.ctx.putImageData(vImage.imageData, 0, 0);
    // ctx.drawImage(vImage.canvas, 0, 0);
    // console.log('Performance JS', performance.now() - s);
    requestAnimationFrame(this.update);
  }

  public render() {
    return (
      <div>
        <div>
          <button onClick={this.handleClick}>haha</button>
          <img src={this.state.img} />
        </div>
        <div>
          <button onClick={this.handlePlay}>wawa</button>
          <canvas ref={'canvas'} width={960} height={540} />
          <video ref={'video'} width={960} height={540} src={vUrl} style={{display: 'none'}}></video>
        </div>
      </div>
    )
  }
};

render(<Main />, document.getElementById('container'));
