import React from 'react';

import styles from './styles.scss';
import NavList from 'components/Header/NavList';
import HeaderPlayButton from 'components/Header/HeaderPlayButton';

const navbarLinks = [
  {
    path: '/sendeplan',
    title: 'Sendeplan',
  },
]

export const RightHeader = () => (
  <div className={styles.container}>
    <div className={styles.headerPlayButtonContainer}>
      <HeaderPlayButton />
    </div>
    <div className={styles.navigationListContainer}>
      <NavList links={navbarLinks} />
    </div>
  </div>
);

export default RightHeader;