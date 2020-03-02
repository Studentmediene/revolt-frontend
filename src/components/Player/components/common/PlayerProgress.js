import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './PlayerProgress.scss';

export default class PlayerProgress extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.audio.addEventListener('timeupdate', () => {
      let ratio = this.audio.currentTime / this.audio.duration;
      let position = this.timeline.offsetWidth * ratio;
      this.positionHandle(position);
    });
  }

  mouseMove = e => {
    // Width of the timeline
    let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;

    // Left position of the handle
    let handleLeft = e.pageX - this.timeline.offsetLeft;
    if (handleLeft >= 0 && handleLeft <= timelineWidth) {
      this.handle.style.marginLeft = handleLeft + 'px';
    }
    if (handleLeft < 0) {
      this.handle.style.marginLeft = '0px';
    }
    if (handleLeft > timelineWidth) {
      this.handle.style.marginLeft = timelineWidth + 'px';
    }
  };

  mouseDown = e => {
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };

  mouseUp = e => {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  };

  positionHandle = position => {
    let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    let handleLeft = position - this.timeline.offsetLeft;
    if (handleLeft >= 0 && handleLeft <= timelineWidth) {
      this.handle.style.marginLeft = handleLeft + 'px';
    }
    if (handleLeft < 0) {
      this.handle.style.marginLeft = '0px';
    }
    if (handleLeft > timelineWidth) {
      this.handle.style.marginLeft = timelineWidth + 'px';
    }
  };

  render() {
    /* 
    // from AudioProgress.js 
    const { live, paused } = this.props;

    const position = this.seekInProgress
      ? this.state.seekPosition
      : this.props.position;

    const duration = this.props.durationEstimate;

    const displayPosition = this.convertSecondsToDisplayTime(position / 1000);
    const displayDuration = this.convertSecondsToDisplayTime(duration / 1000);

    let timeRatio = `${displayPosition} / ${displayDuration}`;
    let progressBarWidth = `${(position / duration) * 100}%`;

    if (this.props.live) {
      timeRatio = null;
      progressBarWidth = `${(1 - this.props.offset / this.maxLiveOffset) *
        100}%`;
    } else if (!this.props.url || duration < 100) {
      // Audio either hasn't loading or is playing blank.mp3
      timeRatio = null;
      progressBarWidth = 0;
    }

    const audioProgressStyle = {
      width: progressBarWidth,
    };
    if (paused || live) {
      audioProgressStyle.border = 'none';
    } */
    return (
      <div
        className={styles.timelineContainer}
        ref={timeline => {
          this.timeline = timeline;
        }}
        onClick={this.mouseMove}
        role="toolbar"
      >
        <audio
          src={this.props.audio}
          ref={audio => {
            this.audio = audio;
          }}
          autoPlay
        />
        <div id={styles.timeline}>
          <div
            id={styles.handle}
            ref={handle => {
              this.handle = handle;
            }}
            onMouseDown={this.mouseDown}
          />
          {/* onMouseMove={this.mouseDown}
            onTouchStart={this.mouseDown}
            onTouchMove={this.mouseDown} */}
        </div>
      </div>
    );
  }
}

PlayerProgress.propTypes = {
  displayText: PropTypes.string.isRequired,
  live: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  url: PropTypes.string,
  offset: PropTypes.string,
  onSeek: PropTypes.func.isRequired,
  durationEstimate: PropTypes.number,
  position: PropTypes.number.isRequired
};

PlayerProgress.defaultProps = {
  url: null,
  offset: null,
  durationEstimate: null
};

/* 

export default class AudioProgress extends Component {
  constructor(props) {
    super(props);

    // Whether or not we are seeking
    this.seekInProgress = false;
    // The HTML of the progress container (updated in the render-function)
    this.audioProgressContainer = null;
    this.audioProgressBoundingRect = null;
    // EventListeners to create on mount and remove on unmount
    this.seekReleaseListener = null;
    this.resizeListener = null;
    // Max live offset in seconds
    this.maxLiveOffset = 60 * 60 * 4; // four hours

    this.state = {
      // Position while user is seeking
      seekPosition: 0,
    };
  }

  componentDidMount() {
    const seekReleaseListener = (this.seekReleaseListener = this.seek);
    window.addEventListener('mouseup', seekReleaseListener);
    document.addEventListener('touchend', seekReleaseListener);
    const resizeListener = (this.resizeListener = this.fetchAudioProgressBoundingRect);
    window.addEventListener('resize', resizeListener);
    resizeListener();
  }

  componentWillUnmount() {
    // remove event listeners bound outside the scope of our component
    window.removeEventListener('mouseup', this.seekReleaseListener);
    document.removeEventListener('touchend', this.seekReleaseListener);
    window.removeEventListener('resize', this.resizeListener);
  }

  seek = event => {
    // This function is activated when the user lets go of the mouse
    // If the user is not currently seeking, don't do anything
    if (!this.seekInProgress) return;
    // Disable live seeking
    if (this.props.live) return;

    event.preventDefault();

    this.props.onSeek(this.state.seekPosition);
    // Cancel the seeking
    this.seekInProgress = false;
  };

  updateDisplayPosition = event => {
    if (event.type === 'mousedown' || event.type === 'touchstart') {
      // TODO: make sure we don't select stuff in the background while seeking
      this.seekInProgress = true;
    } else if (!this.seekInProgress) {
      return;
    }

    event.preventDefault();

    // Hack: The initial position of the bounding rect is not always correct,
    // so as a workaround we always fetch the latest bounding rect
    this.fetchAudioProgressBoundingRect();

    const boundingRect = this.audioProgressBoundingRect;
    const isTouch = event.type.slice(0, 5) === 'touch';
    const pageX = isTouch ? event.targetTouches.item(0).pageX : event.pageX;
    const position = pageX - boundingRect.left - document.body.scrollLeft;
    const containerWidth = boundingRect.width;
    const progressPercentage = position / containerWidth;

    const durationEstimate = this.props.durationEstimate;
    this.setState({
      seekPosition: progressPercentage * durationEstimate,
    });
  };

  convertSecondsToDisplayTime = number => {
    const date = moment.utc(number * 1000);
    if (date.hours() > 0) {
      return date.format('HH:mm:ss');
    }
    return date.format('mm:ss');
  };

  fetchAudioProgressBoundingRect = () => {
    this.audioProgressBoundingRect = this.audioProgressContainer.getBoundingClientRect();
  };

  render() {
    const { displayText, live, paused } = this.props;

    const position = this.seekInProgress
      ? this.state.seekPosition
      : this.props.position;

    const duration = this.props.durationEstimate;

    const displayPosition = this.convertSecondsToDisplayTime(position / 1000);
    const displayDuration = this.convertSecondsToDisplayTime(duration / 1000);

    let timeRatio = `${displayPosition} / ${displayDuration}`;
    let progressBarWidth = `${(position / duration) * 100}%`;

    if (this.props.live) {
      timeRatio = null;
      progressBarWidth = `${(1 - this.props.offset / this.maxLiveOffset) *
        100}%`;
    } else if (!this.props.url || duration < 100) {
      // Audio either hasn't loading or is playing blank.mp3
      timeRatio = null;
      progressBarWidth = 0;
    }

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
        ref={ref => {
          this.audioProgressContainer = ref;
        }}
        onMouseDown={e => this.updateDisplayPosition(e)}
        onMouseMove={e => this.updateDisplayPosition(e)}
        onTouchStart={e => this.updateDisplayPosition(e)}
        onTouchMove={e => this.updateDisplayPosition(e)}
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
  displayText: PropTypes.string.isRequired,
  live: PropTypes.bool.isRequired,
  paused: PropTypes.bool.isRequired,
  url: PropTypes.string,
  offset: PropTypes.string,
  onSeek: PropTypes.func.isRequired,
  durationEstimate: PropTypes.number,
  position: PropTypes.number.isRequired,
};

AudioProgress.defaultProps = {
  url: null,
  offset: null,
  durationEstimate: null,
}; */
