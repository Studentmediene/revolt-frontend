import React from 'react';

import styles from './styles.scss';
import { NavList } from 'components/Header/NavList';
import HamburgerMenu from 'components/Header/HamburgerMenu';

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
  <React.Fragment>
    <div className={styles.largeNavContainer}>
      <NavList links={largeNavbarLinks} />
    </div>
    <div className={styles.smallNavContainer}>
      <HamburgerMenu />
    </div>
  </React.Fragment>
);

export default LeftHeader;
