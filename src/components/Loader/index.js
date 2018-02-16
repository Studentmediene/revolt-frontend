import React from 'react';
import { PulseLoader } from 'react-spinners';
import styles from './styles.css';

class Loader extends React.component {
  render() {
    return (
      <div className={styles.loading}>
        <PulseLoader color={'#4A4A4A'} />
      </div>
    );
  }
}

export default Loader;
