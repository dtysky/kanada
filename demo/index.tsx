/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 19 Dec 2017
 * Description:
 */
import * as React from 'react';
import {render} from 'react-dom';

import ImageEx from './ImageEx';

class Main extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <ImageEx />
      </div>
    );
  }
};

render(<Main />, document.getElementById('container'));

function test() {
  const len = 512 * 512;
  let array = (new Array(11)).fill(0);
  let st = 0;
  
  for (let i = 0; i < len; i += 1) {
    const s = performance.now();
    array.pop();
    array.splice(0, 0, 1);
    // array = [...array.slice(1, 10), 1];
    st += performance.now() - s;
  };
  
  console.log(st, array);
}

// for (let i = 0; i <= 10; i += 1) {
//   test();
// }
