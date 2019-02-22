import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';
import NavDrawer from 'components/Header/NavDrawer';
import hamburgerIcon from './assets/hamburger-menu.svg';

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
  }
];

export class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen,
      }
    })
  }

  render() {
    return (
      <div className={styles.container} onClick={this.toggleMenu}>
        <img src={hamburgerIcon} className={styles.hamburgerIcon} />
        <div className={styles.hamburgerText}>Meny</div>
        <div className={classNames({
          [styles.overlay]: true,
          [styles.active]: this.state.isOpen,
        })}></div>
        <NavDrawer links={navLinks} open={this.state.isOpen} onNavigation={this.toggleMenu}/>
      </div>
    );
  }
}

export default HamburgerMenu;
