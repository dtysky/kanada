/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Jan 2018
 * Description:
 */
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import * as kanata from '../src';

let image: kanata.ImageCore;
const url = '/base/testImages/x.jpg';

const maskImage = new kanata.ImageCore();
const maskUrl = '/base/testImages/mask.png';

const bgImage = new kanata.ImageCore();
const bgUrl = '/base/testImages/bg.jpg';

export default class MaskEx extends React.Component<any, any> {
  public center = {
    x: 0,
    y: 0
  };

  public async componentDidMount() {
    image = new kanata.ImageCore('RGBA', findDOMNode(this.refs.canvas) as HTMLCanvasElement);
    image.fromURL(url)
      .then(img => {
          this.center = {x: image.width, y: image.height};
          image.save();
      });
    await maskImage.fromURL(maskUrl);
    await bgImage.fromURL(bgUrl);
    image.pipe(kanata.mask(maskImage, bgImage, true));
    findDOMNode(this.refs.canvas).addEventListener('mousemove', this.handleMouseMove);
    this.update();
  }

  public componentWillUnmount() {
    findDOMNode(this.refs.canvas).addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    const {layerX, layerY} = event;
    this.center = {x: layerX, y: layerY};
    this.update();
  }

  private update = () => {
    const {x, y} = this.center;
    // console.log(x, y);
    image.restore();
    const s = performance.now();
    image.apply(kanata.changeRegion([x - 400, y - 400, x + 400, y + 400]));
    image.exec();
    console.log('Performance JS', performance.now() - s);
    image.pushDataBackToContext();
  }

  public render() {
    return (
      <div>
        <canvas ref={'canvas'} />
      </div>
    );
  }
}
