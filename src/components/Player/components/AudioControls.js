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
  skipAhead,
  skipBackwards,
  isLatestEpisodeInPlaylist,
  isFirstEpisodeInPlaylist,
}) => {
  return (
    <div className={styles.audioControls}>
      <button
        onClick={skipBackwards}
        disabled={live || !url}
        className={classNames({
          [styles.disabled]: live || !url,
        })}
        styles={{ color: 'white' }}
      >
        B
      </button>
      <button
        disabled={live || !url || isFirstEpisodeInPlaylist}
        className={classNames(styles.backButton, {
          [styles.disabled]: live || !url || isFirstEpisodeInPlaylist,
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
        disabled={live || !url || isLatestEpisodeInPlaylist}
        className={classNames(styles.forwardButton, {
          [styles.disabled]: live || !url || isLatestEpisodeInPlaylist,
        })}
        onClick={playNext}
        onKeyPress={playNext}
      >
        <div className={styles.forwardButtonInner}>
          <div className={styles.rightFacingTriangle} />
          <div className={styles.line} />
        </div>
      </button>
      <button
        onClick={skipAhead}
        disabled={live || !url}
        className={classNames({
          [styles.disabled]: live || !url,
        })}
        styles={{ color: 'white' }}
      >
        A
      </button>
    </div>
  );
};

AudioControls.propTypes = {
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  live: PropTypes.bool.isRequired,
  url: PropTypes.string,
  skipAhead: PropTypes.func.isRequired,
  skipBackwards: PropTypes.func.isRequired,
  isLatestEpisodeInPlaylist: PropTypes.bool,
  isFirstEpisodeInPlaylist: PropTypes.bool,
};

export default AudioControls;
