import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './PlayPauseButton.scss';

const PlayPauseButton = ({ togglePlayPause, paused }) => (
  <button
    className={styles.playPauseButton}
    onClick={togglePlayPause}
    onKeyPress={togglePlayPause}
  >
    <div className={classNames(styles.left, {
      [styles.paused]: paused,
    })} />
    <div className={classNames(styles.right, {
      [styles.paused]: paused,
    })} />
  </button>
);

PlayPauseButton.propTypes = {
  togglePlayPause: PropTypes.func,
  paused: PropTypes.bool.isRequired,
};

export default PlayPauseButton;
