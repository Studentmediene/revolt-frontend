import React from 'react';

import styles from './styles.scss';
import { NavList } from 'components/Header/NavList';

const smallNavbarLinks = [
  {
    path: '/programmer',
    title: 'Programmer',
  }
];

const largeNavbarLinks = [
  ...smallNavbarLinks,
  {
    path: '/sendeplan',
    title: 'Sendeplan',
  },
]

export const LeftHeader = () => (
  <div className={styles.container}>
    <div className={styles.largeNavListContainer}>
      <NavList links={largeNavbarLinks} />
    </div>
    <div className={styles.smallNavListContainer}>
      <NavList links={smallNavbarLinks} />
    </div>
  </div>
);

export default LeftHeader;
