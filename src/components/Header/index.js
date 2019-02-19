import React from 'react';

import Logo from 'components/Header/Logo';
import NavBar from 'components/Header/NavBar';
import HeaderPlayButton from 'components/Header/HeaderPlayButton';

import styles from './styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: false,
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar(e) {
    e.preventDefault()
    this.setState((state) => {
      console.log(state);
      
      return {
        sidebarOpen: !state.sidebarOpen,
      }
    })
  }
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <NavBar open={this.state.sidebarOpen} toggleSidebar={this.toggleSidebar} />
          <Logo />
          <HeaderPlayButton />
        </div>
      </header>
    );
  }
}

export default Header;
