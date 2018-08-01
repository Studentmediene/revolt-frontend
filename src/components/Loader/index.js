import React from 'react';
import { ScaleLoader } from 'react-spinners';
import styles from './styles.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.loading}>
        <ScaleLoader color={'#ECB61C'} />
      </div>
    );
  }
}

export default Loader;
