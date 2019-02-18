import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const navbarLinks = [
  {
    path: '/programmer',
    title: 'Programmer',
  },
  {
    path: '/sendeplan',
    title: 'Sendeplan',
  },
];

const NavBar = () => (
  <div className={styles.navbar}>
    <ul className={styles.navbarList}>
      {navbarLinks.map(link => (
        <li key={link.path} className={styles.navbarItem}>
          <Link className={styles.navbarLink} to={link.path}>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NavBar;
