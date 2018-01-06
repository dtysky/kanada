/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import * as kanata from '../src';

const vImage = new kanata.ImageCore();
const vUrl = '/base/testImages/x.mp4';

export default class VideoEx extends React.Component<any, any> {
  private video: HTMLVideoElement;
  private ctx: CanvasRenderingContext2D;

  private handlePlay = () => {
    const video = findDOMNode(this.refs.video) as HTMLVideoElement;
    const canvas = findDOMNode(this.refs.canvas) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    this.ctx = ctx;
    this.video = video;
    // vImage.pipe(kanata.contrastStretch(40, 40, 160, 160));
    vImage.pipe(kanata.affineTransform(1, .1, 0, .1, 1, 0));
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
        <button onClick={this.handlePlay}>wawa</button>
        <canvas ref={'canvas'} width={960} height={540} />
        <video ref={'video'} width={960} height={540} src={vUrl} style={{display: 'none'}}></video>
      </div>
    );
  }
}
