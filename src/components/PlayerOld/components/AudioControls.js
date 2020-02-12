import React from 'react';
import PropTypes from 'prop-types';
import PlayPauseButton from './PlayPauseButton';
import styles from './AudioControls.scss';
import classNames from 'classnames';

const AudioControls = ({
  playNext,
  playPrevious,
  togglePlayPause,
  paused,
  live,
  url,
}) => (
  <div className={styles.audioControls}>
    <button
      disabled={live || !url}
      className={classNames(styles.backButton, {
        [styles.disabled]: live || !url,
      })}
      onClick={playPrevious}
      onKeyPress={playPrevious}
    >
      <div className={styles.backButtonInner}>
        <div className={styles.rightFacingTriangle} />
        <div className={styles.line} />
      </div>
    </button>
    <div className={styles.audioControlContainer}>
      <PlayPauseButton paused={paused} togglePlayPause={togglePlayPause} />
    </div>
    <button
      disabled={live || !url}
      className={classNames(styles.forwardButton, {
        [styles.disabled]: live || !url,
      })}
      onClick={playNext}
      onKeyPress={playNext}
    >
      <div className={styles.forwardButtonInner}>
        <div className={styles.rightFacingTriangle} />
        <div className={styles.line} />
      </div>
    </button>
  </div>
);

AudioControls.propTypes = {
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  live: PropTypes.bool.isRequired,
  url: PropTypes.string,
};

export default AudioControls;
