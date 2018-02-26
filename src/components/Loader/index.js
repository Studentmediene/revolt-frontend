import React from 'react';
import { PulseLoader } from 'react-spinners';
import styles from './styles.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.loading}>
        <PulseLoader color={'#ECB61C'} />
      </div>
    );
  }
}

export default Loader;
