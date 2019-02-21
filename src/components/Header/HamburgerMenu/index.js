import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import hamburgerIcon from './assets/hamburger-menu.svg';
import { togglePlayPause } from 'components/Player/actions';

export class HamburgerMenu extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={styles.container}>
        <img src={hamburgerIcon} className={styles.hamburgerIcon} />
        <div className={styles.hamburgerText}>Meny</div>
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
