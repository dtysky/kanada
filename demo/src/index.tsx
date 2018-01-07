/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 19 Dec 2017
 * Description:
 */
import * as React from 'react';
import {render} from 'react-dom';

import ImageEx from './ImageExamples';
import VideoEx from './VideoExamples';
import MaskEx from './MaskExamples';

import 'hana-ui/hana-style.scss';
import './base.scss';

class Main extends React.Component<any, any> {
  public render() {
    return (
      <React.Fragment>
        <div className={'topbar'}>
          <h1>
            kanata
          </h1>
          <a
            href={'https://github.com/dtysky/kanata'}
            target={'_blank'}
          >
            View on Github
          </a>
        </div>
        <div className={'content'}>
          <ImageEx />
        </div>
      </React.Fragment>
    );
  }
};

render(<Main />, document.getElementById('container'));
