/*eslint no-console: ["error", { allow: ["log"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { soundManager } from 'soundmanager2';

import AudioProgress from './components/AudioProgress';
import AudioControls from './components/AudioControls';
import SoundManager from './components/SoundManager';
import {
  playLive,
  getPodcastPlaylist,
  getOnDemandPlaylist,
  pauseLive,
  pause,
  resume,
  togglePlayPause,
  playNext,
  playPrevious,
} from './actions';
import {
  selectPlaylist,
  selectIndex,
  selectOffset,
  selectLive,
  selectPlayingTitle,
  selectPaused,
  selectUrl,
} from './selectors';
import styles from './styles.css';

class Player extends React.Component {
  constructor(props) {
    super(props);
    // Initial volume
    this.volume = 80;
    // Whether or not we are seeking
    this.seekInProgress = false;
    // The HTML of the progress container (updated in the render-function)
    this.audioProgressContainer = null;
    /* bounding rectangle used for calculating seek
     * position from mouse/touch coordinates
     */
    this.audioProgressBoundingRect = null;
    // EventListeners to create on mount and remove on unmount
    this.seekReleaseListener = null;
    this.resizeListener = null;
    // Max live offset in seconds
    this.maxLiveOffset = 60 * 60 * 4; // four hours
  }

  state = {
    // Number of seconds played
    position: 0,
    // Position while user is seeking
    seekPosition: 0,
    // Duration of the audio (estimate)
    duration: 0,
  };

  componentWillMount() {
    soundManager.onready(() => {
      // Load correct URL based on browser support
      const oggUrl = 'https://direkte.radiorevolt.no/revolt.ogg';
      const aacUrl = 'https://direkte.radiorevolt.no/revolt.aac';
      if (soundManager.canPlayURL(oggUrl)) {
        this.liveUrl = oggUrl;
      } else {
        this.liveUrl = aacUrl;
      }
    });
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

    this.setState(state => ({
      position: state.seekPosition,
    }));
    // Cancel the seeking
    this.seekInProgress = false;
  };

  updateDisplayPosition = event => {
    /* This only updates the displayed position of the player,
     * and not the actual position of the sound object.
     */
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

    this.setState(state => ({
      seekPosition: progressPercentage * state.durationEstimate,
    }));
  };

  fetchAudioProgressBoundingRect = () => {
    this.audioProgressBoundingRect = this.audioProgressContainer.getBoundingClientRect();
  };

  convertSecondsToDisplayTime = number => {
    const secs = (number % 60).toFixed();
    const mins = Math.floor(number / 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  whilePlaying(soundObject) {
    this.setState({
      position: soundObject.position,
      durationEstimate: soundObject.durationEstimate,
    });
  }

  render() {
    const { position, seekPosition } = this.state;
    const duration = this.state.durationEstimate;

    const displayPosition = this.convertSecondsToDisplayTime(
      seekPosition / 1000,
    );
    const displayDuration = this.convertSecondsToDisplayTime(duration / 1000);

    let timeRatio = `${displayPosition} / ${displayDuration}`;
    let progressBarWidth = `${seekPosition / duration * 100}%`;

    if (this.props.live) {
      timeRatio = null;
      progressBarWidth = `${(1 - this.props.offset / this.maxLiveOffset) *
        100}%`;
    } else if (!this.props.url) {
      timeRatio = null;
    }

    return (
      <div className={styles.container} title={this.props.playingTitle}>
        <SoundManager
          url={this.props.url}
          paused={this.props.paused}
          position={position}
          volume={this.volume}
          whilePlaying={(...a) => this.whilePlaying(...a)}
          onPlay={() => {
            console.log('onPlay event');
          }}
          onPause={() => {
            this.props.pause();
          }}
          onResume={() => {
            this.props.resume();
          }}
          onFinishedPlaying={() => {
            this.props.playNext();
          }}
        />
        <AudioControls
          playNext={() => this.props.playNext()}
          playPrevious={() => {
            if (!this.props.live) {
              const backLimit = 2 * 1000; // two seconds
              if (this.state.position >= backLimit) {
                this.setState({
                  position: 0,
                });
              } else {
                this.props.playPrevious();
              }
            }
          }}
          togglePlayPause={() => this.props.togglePlayPause()}
          paused={this.props.paused}
        />
        <AudioProgress
          audioProgressRef={el => {
            this.audioProgressContainer = el;
          }}
          displayText={this.props.playingTitle}
          live={this.props.live}
          paused={this.props.paused}
          progressBarWidth={progressBarWidth}
          timeRatio={timeRatio}
          updateDisplayPosition={e => this.updateDisplayPosition(e)}
        />
      </div>
    );
  }
}

Player.propTypes = {
  playLive: PropTypes.func,
  pauseLive: PropTypes.func,
  playPodcast: PropTypes.func,
  playOnDemand: PropTypes.func,
  playlist: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  offset: PropTypes.number,
  index: PropTypes.number,
  live: PropTypes.bool,
  paused: PropTypes.bool,
  url: PropTypes.string,
  playingTitle: PropTypes.string,
  togglePlayPause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
};

Player.defaultProps = {
  paused: true,
  url: null,
};

const mapStateToProps = createStructuredSelector({
  playlist: selectPlaylist(),
  live: selectLive(),
  offset: selectOffset(),
  index: selectIndex(),
  paused: selectPaused(),
  url: selectUrl(),
  playingTitle: selectPlayingTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    playLive: (offset = 0) => dispatch(playLive(offset)),
    pauseLive: () => dispatch(pauseLive()),
    playPodcast: (episodeId, offset = 0) =>
      dispatch(getPodcastPlaylist(episodeId, offset)),
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
    togglePlayPause: () => dispatch(togglePlayPause()),
    resume: () => dispatch(resume()),
    pause: () => dispatch(pause()),
    playNext: () => dispatch(playNext()),
    playPrevious: () => dispatch(playPrevious()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
