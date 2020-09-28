import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import styles from './PlayerProgress.scss';

const PlayerProgressFunctional = props => {
  const [seek, setSeek] = useState({ position: 0, inProgress: false });

  // The HTML of the progress container
  const audioProgressContainer = useRef(null);
  // Max live offset in seconds
  const maxLiveOffset = 60 * 60 * 4; // four hours

  useEffect(() => {
    //equal to componentDidMount
    const seekReleaseListener = seekEvent;
    window.addEventListener('mouseup', seekReleaseListener);
    document.addEventListener('touchend', seekReleaseListener);

    //equal to componentWillUnmount
    //TODO might need to add resizelisener, cant find any bugs without it yet.
    return () => {
      window.removeEventListener('mouseup', seekReleaseListener); //update the refs
      document.removeEventListener('touchend', seekReleaseListener);
    };
  });

  const seekEvent = event => {
    // This function is activated when the user lets go of the mouse
    // If the user is not currently seeking, don't do anything
    if (!seek.inProgress) return;
    // Disable live seeking
    if (props.live) return;

    event.preventDefault();
    props.onSeek(seek.position);
    // Cancel the seeking
    setSeek(state => ({ ...state, inProgress: false }));
  };

  const updateDisplayPosition = event => {
    //only update timeline and audioprogress, not on mouseMove and TouchMove
    if (event.type === 'mousedown' || event.type === 'touchstart') {
      setSeek(state => ({ ...state, inProgress: true }));
    } else if (!seek.inProgress) {
      return;
    }

    event.preventDefault();

    // Hack: The initial position of the bounding rect is not always correct,
    // so as a workaround we always fetch the latest bounding rect
    const boundingRect = audioProgressContainer.current.getBoundingClientRect();
    const isTouch = event.type.slice(0, 5) === 'touch';
    const pageX = isTouch ? event.targetTouches.item(0).pageX : event.pageX;
    const position = pageX - boundingRect.left - document.body.scrollLeft;
    const containerWidth = boundingRect.width;
    const progressPercentage = position / containerWidth;

    const duration = props.duration;
    setSeek(state => ({
      ...state,
      position: progressPercentage * duration
    }));
  };

  const convertSecondsToDisplayTime = number => {
    const date = moment.utc(number * 1000);
    if (date.hours() > 0) {
      return date.format('HH:mm:ss');
    }
    return date.format('mm:ss');
  };

  const duration = props.duration;
  const position = seek.inProgress
    ? Math.min(seek.position, duration)
    : props.position;

  const displayDuration = convertSecondsToDisplayTime(duration / 1000);
  const displayPosition = convertSecondsToDisplayTime(position / 1000);

  let progressBarWidth = `${(position / duration) * 100}%`;

  if (props.live) {
    progressBarWidth = `${(1 - props.offset / maxLiveOffset) * 100}%`;
  } else if (!props.url || duration < 100) {
    // Audio either hasn't loading or is playing blank.mp3
    progressBarWidth = '100%';
  }

  const audioProgressStyle = {
    width: progressBarWidth
  };
  if (props.live) {
    audioProgressStyle.backgroundColor = '#868686';
    audioProgressStyle.cursor = 'default';
  }

  return (
    <div className={styles.timeline}>
      <span
        className={classnames(styles.time, {
          [styles.hidden]: props.live
        })}
      >
        {displayPosition}
      </span>
      <div
        role="toolbar"
        className={styles.audioProgressContainer}
        ref={audioProgressContainer}
        onMouseMove={e => updateDisplayPosition(e)}
        onTouchMove={e => updateDisplayPosition(e)}
      >
        <div
          role="toolbar"
          className={styles.audioProgressline}
          onMouseDown={e => updateDisplayPosition(e)}
          onTouchStart={e => updateDisplayPosition(e)}
        >
          <div className={styles.audioProgress} style={audioProgressStyle}>
            <div
              className={classnames({
                [styles.handle]: !props.live
              })}
            />
          </div>
        </div>
      </div>
      {
        <span
          className={classnames(styles.time, {
            [styles.hidden]: props.live
          })}
        >
          {displayDuration}
        </span>
      }
    </div>
  );
};

PlayerProgressFunctional.propTypes = {
  live: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  url: PropTypes.string,
  offset: PropTypes.string,
  onSeek: PropTypes.func.isRequired,
  duration: PropTypes.number,
  position: PropTypes.number.isRequired
};

PlayerProgressFunctional.defaultProps = {
  url: null,
  offset: null,
  duration: null
};

export default PlayerProgressFunctional;
