/*
 *
 * Player
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { soundManager } from 'soundmanager2';
import { createStructuredSelector } from 'reselect';
import { fromJS, is } from 'immutable';

import PlaylistController from './utils/PlaylistController';
import { playLive, getPodcastPlaylist, getOnDemandPlaylist } from './actions';
import {
  selectPlaylist,
  selectIndex,
  selectOffset,
  selectLive,
} from './selectors';
import styles from './styles.css';

class Player extends React.Component {
  constructor(props) {
    super(props);
    // Initial volume
    this.volume = 80;
    // Whether or not we are seeking
    this.seekInProgress = false;
    // Stores the soundmanager sound object
    this.soundObject = null;
    // The HTML of the progress container (updated in the render-function)
    this.audioProgressContainer = null;
    /* bounding rectangle used for calculating seek
     * position from mouse/touch coordinates
     */
    this.audioProgressBoundingRect = null;
    // EventListeners to create on mount and remove on unmount
    this.seekReleaseListener = null;
    this.resizeListener = null;
    // The controller handling playlist actions
    this.playlistController = new PlaylistController();
    // The live URL
    this.liveUrl = 'https://direkte.radiorevolt.no/revolt.ogg';
    // Max live offset in seconds
    this.maxLiveOffset = 60 * 60 * 4; // four hours
  }

  state = {
    // Number of seconds played
    displayPosition: 0,
    // Duration of the audio (estimate)
    dispayDuration: 0,
    // Display text
    displayText: '',
    // Whether or not it is live (not a podcast or SoD)
    live: false,
    // Whether or not it's paused
    paused: true,
  };

  componentWillMount() {
    // Load correct URL based on browser support
    const oggUrl = 'https://direkte.radiorevolt.no/revolt.ogg';
    const aacUrl = 'https://direkte.radiorevolt.no/revolt.aac';
    if (soundManager.canPlayURL(oggUrl)) {
      this.liveUrl = oggUrl;
    } else {
      this.liveUrl = aacUrl;
    }

    // SoundManager2 setup
    soundManager.setup({
      preferFlash: false,
      debugMode: false,
      html5PollingInterval: 50,
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

  componentWillReceiveProps(nextProps) {
    // Test if we got something new
    if (is(fromJS(this.props), fromJS(nextProps))) {
      // The props are identical
      return;
    }

    if (nextProps.live) {
      this.playLive();
    } else if (nextProps.playlist) {
      this.playlistController = new PlaylistController(
        nextProps.playlist,
        nextProps.index,
      );
      if (nextProps.playlist.length > 0) {
        this.playShow(this.playlistController.getCurrent());
      }
    }
  }

  componentWillUnmount() {
    // remove event listeners bound outside the scope of our component
    window.removeEventListener('mouseup', this.seekReleaseListener);
    document.removeEventListener('touchend', this.seekReleaseListener);
    window.removeEventListener('resize', this.resizeListener);
    // stop the audio (we can't know when garbage collection will run)
    soundManager.stopAll();
  }

  resume = () => {
    if (this.soundObject && this.soundObject.readyState) {
      this.soundObject.resume();
    }
  };

  pause = () => {
    if (this.soundObject && this.soundObject.readyState) {
      this.soundObject.pause();
    }
  };

  togglePlayPause = () => {
    if (this.soundObject && this.soundObject.readyState) {
      this.soundObject.togglePause();
    } else {
      this.props.playLive(0);
    }
  };

  playNext = () => {
    if (!this.props.live) {
      if (this.soundObject && this.soundObject.readyState) {
        this.playShow(this.playlistController.getNext());
      }
    }
  };

  playPrevious = () => {
    if (!this.props.live) {
      if (this.soundObject && this.soundObject.readyState) {
        const backLimit = 2 * 1000; // two seconds
        if (this.soundObject.position < backLimit) {
          this.playShow(this.playlistController.getPrevious());
        } else {
          this.soundObject.setPosition(0);
        }
      }
    }
  };

  seek = event => {
    // This function is activated when the user lets go of the mouse
    // If the user is not currently seeking, don't do anything
    if (!this.seekInProgress) return;

    event.preventDefault();
    // Update the position
    this.soundObject.setPosition(this.state.displayPosition);
    // Cancel the seeking
    this.seekInProgress = false;
  };

  playShow = (show, pos = 0) => {
    if (show === null) {
      return;
    }

    this.setState({
      displayText: `${show.show}: ${show.title}`,
      live: false,
    });

    this.play(show.url, pos);
  };

  playLive = () => {
    this.setState({
      displayText: 'Radio Revolt',
      url: `${this.liveUrl}?offset=${this.props.offset}`,
    });

    this.play(this.liveUrl);
  };

  play = (url, pos = 0) => {
    if (!this.soundObject) {
      // Create a new sound object
      this.soundObject = soundManager.createSound({
        url,
        volume: this.volume,
        whileplaying: () => {
          if (!this.props.live && !this.seekInProgress) {
            this.setState({
              displayPosition: this.soundObject.position,
              displayDuration: this.soundObject.durationEstimate,
            });
          }
        },
        onplay: () => {
          this.setState({
            paused: false,
          });
        },
        onpause: () => {
          this.setState({
            paused: true,
          });
        },
        onresume: () => {
          this.setState({
            paused: false,
          });
        },
        onstop: () => {
          this.setState({
            paused: true,
            live: false,
          });
        },
        onfinish: () => {
          if (!this.props.live) {
            const lastIndex = this.playlistController.getPosition();
            const next = this.playlistController.getNext();

            // Check that there is more shows to play
            if (next && this.playlistController.getPosition !== lastIndex) {
              // Play the next show
              this.playShow(next);
            }
          }
        },
        onload: () => {
          // While the sound is loading
        },
        onerror: () => {
          // When shits fucked
        },
      });
    }

    // required to reset pause/play state on iOS so whileplaying() works? odd.
    this.soundObject.stop();

    soundManager.stopAll();

    this.soundObject.play({
      url,
      position: pos * 1000,
    });
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

    const boundingRect = this.audioProgressBoundingRect;
    const isTouch = event.type.slice(0, 5) === 'touch';
    const pageX = isTouch ? event.targetTouches.item(0).pageX : event.pageX;
    const position = pageX - boundingRect.left - document.body.scrollLeft;
    const containerWidth = boundingRect.width;
    const progressPercentage = position / containerWidth;

    this.setState({
      displayPosition: progressPercentage * this.soundObject.durationEstimate,
    });
  };

  fetchAudioProgressBoundingRect = () => {
    this.audioProgressBoundingRect = this.audioProgressContainer.getBoundingClientRect();
  };

  convertSecondsToDisplayTime = number => {
    const secs = (number % 60).toFixed();
    const mins = Math.floor(number / 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  render() {
    const position = this.state.displayPosition;
    const duration = this.state.displayDuration;

    const displayPosition = this.convertSecondsToDisplayTime(position / 1000);
    const displayDuration = this.convertSecondsToDisplayTime(duration / 1000);

    let timeRatio = `${displayPosition} / ${displayDuration}`;
    let progressBarWidth = `${position / duration * 100}%`;

    if (this.props.live) {
      timeRatio = null;
      progressBarWidth = `${(1 - this.props.offset / this.maxLiveOffset) *
        100}%`;
    } else if (!this.soundObject) {
      timeRatio = null;
    }

    let playPauseButtonStyle = styles.playPauseButton;
    if (this.state.paused) {
      playPauseButtonStyle += ` ${styles.paused}`;
    }

    const audioProgressStyle = {
      width: progressBarWidth,
    };
    if (this.state.paused || this.state.live) {
      audioProgressStyle.border = 'none';
    }

    return (
      <div className={styles.container} title={this.state.displayText}>
        <div className={styles.audioControls}>
          <button
            className={styles.backButton}
            onClick={this.playPrevious}
            onKeyPress={this.playPrevious}
          >
            <div className={styles.backButtonInner}>
              <div className={styles.rightFacingTriangle} />
              <div className={styles.line} />
            </div>
          </button>
          <button
            className={playPauseButtonStyle}
            onClick={this.togglePlayPause}
            onKeyPress={this.togglePlayPause}
          >
            <div className={styles.playPauseButtonInner}>
              <div className={styles.left} />
              <div className={styles.right} />
              <div className={styles.triangle1} />
              <div className={styles.triangle2} />
            </div>
          </button>
          <button
            className={styles.forwardButton}
            onClick={this.playNext}
            onKeyPress={this.playNext}
          >
            <div className={styles.forwardButtonInner}>
              <div className={styles.rightFacingTriangle} />
              <div className={styles.line} />
            </div>
          </button>
        </div>

        <div
          role="toolbar"
          className={styles.audioProgressContainer}
          ref={ref => {
            this.audioProgressContainer = ref;
          }}
          onMouseDown={this.updateDisplayPosition}
          onMouseMove={this.updateDisplayPosition}
          onTouchStart={this.updateDisplayPosition}
          onTouchMove={this.updateDisplayPosition}
        >
          <div className={styles.audioProgress} style={audioProgressStyle} />
          <div className={styles.audioProgressOverlay}>
            <div className={styles.audioInfoMarquee}>
              <div className={styles.audioInfo} draggable="false">
                {this.state.displayText}
              </div>
            </div>
            <div className={styles.audioTimeProgress} draggable="false">
              {timeRatio}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  playLive: React.PropTypes.func,
  playPodcast: React.PropTypes.func,
  playOnDemand: React.PropTypes.func,
  playlist: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  offset: React.PropTypes.number,
  index: React.PropTypes.number,
  live: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  playlist: selectPlaylist(),
  live: selectLive(),
  offset: selectOffset(),
  index: selectIndex(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    playLive: (offset = 0) => dispatch(playLive(offset)),
    playPodcast: (episodeId, offset = 0) =>
      dispatch(getPodcastPlaylist(episodeId, offset)),
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
