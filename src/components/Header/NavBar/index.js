import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const navbarLinks = [
  {
    path: '/',
    title: 'Hjem',
  },
  {
    path: '/programmer',
    title: 'Programmer',
  },
];

const NavBar = () => (
  <ul className={styles.navbarList}>
    {navbarLinks.map(link => (
      <li key={link.path} className={styles.navbarItem}>
        <Link className={styles.navbarLink} to={link.path}>
          {link.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default NavBar;
