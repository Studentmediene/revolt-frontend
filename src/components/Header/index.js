import React from 'react';

import Logo from 'components/Header/Logo';
import NavBar from 'components/Header/NavBar';
import HeaderPlayButton from 'components/Header/HeaderPlayButton';

import styles from './styles.scss';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <NavBar />
          <Logo />
          <HeaderPlayButton />
        </div>
      </header>
    );
  }
}

export default Header;
