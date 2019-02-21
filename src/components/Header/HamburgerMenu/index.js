import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import { togglePlayPause } from 'components/Player/actions';
import { hamburgerIcon } from './assets/hamburger-menu.svg';

export class HamburgerMenu extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={styles.container}>
        <img src={hamburgerIcon}/>
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
