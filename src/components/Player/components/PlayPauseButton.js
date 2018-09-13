import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './PlayPauseButton.css';

const PlayPauseButton = ({ togglePlayPause, paused }) => (
  <button
    className={classNames(styles.playPauseButton, {
      [styles.paused]: paused,
    })}
    onClick={togglePlayPause}
    onKeyPress={togglePlayPause}
  >
    <div className={styles.playPauseButtonInner}>
      <div className={styles.left} />
      <div className={styles.right} />
      <div className={styles.triangle1} />
      <div className={styles.triangle2} />
    </div>
  </button>
);

PlayPauseButton.propTypes = {
  togglePlayPause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

export default PlayPauseButton;
