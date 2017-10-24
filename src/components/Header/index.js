import React from 'react';

import Logo from 'components/Header/Logo';
import NavBar from 'components/Header/NavBar';
import HeaderPlayButton from 'components/Header/HeaderPlayButton';

import styles from './styles.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <NavBar />
        <Logo />
        <HeaderPlayButton />
      </header>
    );
  }
}

export default Header;
