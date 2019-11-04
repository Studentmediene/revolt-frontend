import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';
import NavDrawer from 'components/Header/NavDrawer';
import { trackEvent } from 'utils/analytics';

const navLinks = [
  {
    path: '/',
    title: 'Forside',
  },
  {
    path: '/programmer',
    title: 'Programmer',
  },
  {
    path: '/sendeplan',
    title: 'Sendeplan',
  },
];

export class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    trackEvent('button', 'open navigation menu');
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen,
      };
    });
  }

  render() {
    return (
      <button className={styles.container} onClick={this.toggleMenu}>
        <img
          src="/assets/hamburger-menu.svg"
          className={styles.hamburgerIcon}
        />
        <div className={styles.hamburgerText}>Meny</div>
        <div
          className={classNames({
            [styles.overlay]: true,
            [styles.active]: this.state.isOpen,
          })}
        />
        <NavDrawer
          links={navLinks}
          open={this.state.isOpen}
          onNavigation={this.toggleMenu}
        />
      </button>
    );
  }
}

export default HamburgerMenu;
