import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './AudioProgress.css';

export default class AudioProgress extends Component {
  render() {
    const {
      audioProgressRef,
      displayText,
      live,
      paused,
      progressBarWidth,
      timeRatio,
      updateDisplayPosition,
    } = this.props;
    const audioProgressStyle = {
      width: progressBarWidth,
    };
    if (paused || live) {
      audioProgressStyle.border = 'none';
    }

    return (
      <div
        role="toolbar"
        className={styles.audioProgressContainer}
        ref={audioProgressRef}
        onMouseDown={updateDisplayPosition}
        onMouseMove={updateDisplayPosition}
        onTouchStart={updateDisplayPosition}
        onTouchMove={updateDisplayPosition}
      >
        <div className={styles.audioProgress} style={audioProgressStyle} />
        <div className={styles.audioProgressOverlay}>
          <div className={styles.audioInfoMarquee}>
            <div className={styles.audioInfo} draggable="false">
              {displayText}
            </div>
          </div>
          <div className={styles.audioTimeProgress} draggable="false">
            {timeRatio}
          </div>
        </div>
      </div>
    );
  }
}

AudioProgress.propTypes = {
  audioProgressRef: PropTypes.func.isRequired,
  displayText: PropTypes.string.isRequired,
  live: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  progressBarWidth: PropTypes.string.isRequired,
  timeRatio: PropTypes.string.isRequired,
  updateDisplayPosition: PropTypes.func.isRequired,
};
