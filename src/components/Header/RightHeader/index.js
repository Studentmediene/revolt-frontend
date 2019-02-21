import React from 'react';

import styles from './styles.scss';
import HeaderPlayButton from 'components/Header/HeaderPlayButton';


export const RightHeader = () => (
  <div className={styles.container}>
    <HeaderPlayButton />
  </div>
);

export default RightHeader;