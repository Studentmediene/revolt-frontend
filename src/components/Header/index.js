import React from 'react';

import Logo from 'components/Header/Logo';
import LeftHeader from 'components/Header/LeftHeader';
import RightHeader from 'components/Header/RightHeader';

import styles from './styles.scss';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <LeftHeader />
          <Logo />
          <RightHeader />
        </div>
      </header>
    );
  }
}

export default Header;
