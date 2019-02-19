import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.scss';
import hamburgerIcon from './assets/hamburger-menu.svg'

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

const navbarComponents = navbarLinks.map(link => (
  <li key={link.path} className={styles.navbarItem}>
    <Link className={styles.navbarLink} to={link.path}>
      {link.title}
    </Link>
  </li>
))

const NavBar = (props) => (
  <div className={styles.navbar}>
    <div className={styles.hamburgerMenu}>
      <img src={hamburgerIcon} className={styles.hamburgerIcon} onClick={props.toggleSidebar} />
      <div className={classNames({
        [styles.hamburgerNav]: true,
        [styles.sidebarOpen]: props.open,
        [styles.sidebarClosed]: !props.open,
      })}>{navbarComponents}
      </div>
    </div>
    <ul className={styles.navbarList}>
      {navbarComponents}
    </ul>
  </div>
);

export default NavBar;
