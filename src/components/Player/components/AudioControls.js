import React from 'react';
import PropTypes from 'prop-types';
import PlayPauseButton from './PlayPauseButton';
import styles from './AudioControls.css';

const AudioControls = ({ playNext, playPrevious, togglePlayPause, paused }) => (
  <div className={styles.audioControls}>
    <button
      className={styles.backButton}
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
      className={styles.forwardButton}
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
};

export default AudioControls;
