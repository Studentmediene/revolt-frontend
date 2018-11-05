import React from 'react';
import PropTypes from 'prop-types';
import PlayPauseButton from './PlayPauseButton';
import styles from './AudioControls.css';
import classNames from 'classnames';

const AudioControls = ({ playNext, playPrevious, togglePlayPause, paused, live, url }) => (
  <div className={styles.audioControls}>
    <button
      disabled={live || !url}
      className={classNames({
        [styles.backButtonDisabled]: live || !url,
        [styles.backButton]: !live,
      })}
      onClick={playPrevious}
      onKeyPress={playPrevious}
    >
      <div className={styles.backButtonInner}>
        <div className={styles.rightFacingTriangle} />
        <div className={styles.line} />
      </div>
    </button>
    <PlayPauseButton paused={paused} togglePlayPause={togglePlayPause} />
    <button
      disabled={live || !url}
      className={classNames({
        [styles.forwardButtonDisabled]: live || !url,
        [styles.forwardButton]: !live,
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
};

export default AudioControls;
