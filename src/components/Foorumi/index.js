/**
*
* Foorumi
*
*/

import React from 'react';

import styles from './styles.css';
import Canvas from './canvas';

class Foorumi extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Canvas
        id="myCanvas"
        className={styles.canvas}
        width={640}
        height={400}
      />
    );
  }
}

export default Foorumi;
