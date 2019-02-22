import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import hamburgerIcon from './assets/hamburger-menu.svg';
import NavDrawer from 'components/Header/NavDrawer';
import { togglePlayPause } from 'components/Player/actions';

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

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    togglePlayPause: () => dispatch(togglePlayPause()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);
