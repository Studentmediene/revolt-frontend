import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from './styles.scss';

const navbarComponents = links =>
  links.map(link => (
    <li key={link.path} className={styles.navbarItem}>
      <Link className={styles.navbarLink} href={link.path}>
        {link.title}
      </Link>
    </li>
  ));

export const NavList = props => (
  <ul className={styles.navbarList}>{navbarComponents(props.links)}</ul>
);

NavList.propTypes = {
  links: PropTypes.array.isRequired,
};

export default NavList;
