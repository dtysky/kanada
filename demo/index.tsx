/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 19 Dec 2017
 * Description:
 */
import * as React from 'react';
import {render} from 'react-dom';

import * as kanata from '../src';

const image = new kanata.ImageCore();
const url = '/base/testImages/x.jpg';

declare const FILTER: any;
const canvas = document.createElement('canvas');

class Main extends React.Component<any, any> {
  public state = {
    img: ''
  };

  public componentDidMount() {
    image.fromUrl(url)
    .then(img => {
        this.setState({img: img.dataURL});
    });
  }

  private handleClick = () => image.fromUrl(url)
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
      const s = performance.now();
      // kanata.grayscale(img);
      // kanata.translate(img, [100, 100]);
      // kanata.rotate(image, 30 * Math.PI / 180, [image.width / 2, image.height / 2]);
      // kanata.shear(image, [.5, .5]);
      kanata.scale(image, [.5, .5]);
      // kanata.linearTransform(image, 20);
      // kanata.colorInvert(image);
      // kanata.globalThreshold(image, 100);
      console.log('Performance', performance.now() - s);
      img.pushDataBackToContext();
      this.setState({img: img.dataURL});
    });

  public render() {
    return (
      <div>
        <button onClick={this.handleClick}>haha</button>
        <img src={this.state.img} />
      </div>
    )
  }
};

render(<Main />, document.getElementById('container'));
