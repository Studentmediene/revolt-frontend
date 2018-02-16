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
  }

  state = {
    // Number of seconds played
    position: 0,
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

  resetPosition() {
    this.setState({
      position: 0,
    });
  }

  onSeek(seekPosition) {
    this.setState({
      position: seekPosition,
    });
  }

  whilePlaying(soundObject) {
    this.setState({
      position: soundObject.position,
      durationEstimate: soundObject.durationEstimate,
    });
  }

  render() {
    const { position } = this.state;

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
            this.resetPosition();
            this.props.playNext();
          }}
        />
        <AudioControls
          playNext={() => this.props.playNext()}
          playPrevious={() => {
            if (!this.props.live) {
              const backLimit = 2 * 1000; // two seconds
              if (this.state.position >= backLimit) {
                this.resetPosition();
              } else {
                this.props.playPrevious();
              }
            }
          }}
          togglePlayPause={() => this.props.togglePlayPause()}
          paused={this.props.paused}
        />
        <AudioProgress
          displayText={this.props.playingTitle}
          live={this.props.live}
          paused={this.props.paused}
          url={this.props.url}
          position={this.state.position}
          durationEstimate={this.state.durationEstimate}
          onSeek={position => this.onSeek(position)}
        />
      </div>
    );
  }
}

Player.propTypes = {
  playLive: PropTypes.func,
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
