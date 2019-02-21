import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const navbarComponents = links => links.map(link => (
  <li key={link.path} className={styles.navbarItem}>
    <Link className={styles.navbarLink} to={link.path}>
      {link.title}
    </Link>
  </li>
))

export const NavList = (props) => (
  <ul className={styles.navbarList}>
    {navbarComponents(props.links)}
  </ul>
);

export default NavList;
