import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AudioProgress from './components/AudioProgress';
import AudioControls from './components/AudioControls';
import SoundManager from './components/SoundManager';
import {
  pause,
  resume,
  togglePlayPause,
  playNext,
  playPrevious,
  liveTitleUpdater,
} from './actions';
import {
  selectOffset,
  selectLive,
  selectPlayingTitle,
  selectPaused,
  selectUrl,
} from './selectors';
import styles from './styles.scss';

class Player extends React.Component {
  constructor(props) {
    super(props);
    // Initial volume
    this.volume = 80;
  }

  state = {
    // Used to determine when to reset player position
    currentUrl: '',
    // Number of seconds played
    position: 0,
    // Duration of the audio (estimate)
    duration: 0,
  };

  static async getInitialProps({ isServer }) {
    return { isServer };
  }

  componentDidMount() {
    this.props.updateLiveTitle();
  }

  componentDidUpdate() {
    if (this.props.url != this.state.currentUrl) {
      // Audio URL has changed, so let's reset progress position
      this.resetPosition(this.props.url);
    }
  }

  resetPosition(currentUrl) {
    this.setState({
      position: 0,
      currentUrl,
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
    if (this.props.isServer) {
      return null;
    }
    const { position } = this.state;
    return (
      <div className={styles.container} title={this.props.playingTitle}>
        <SoundManager
          url={this.props.url}
          paused={this.props.paused}
          position={position}
          volume={this.volume}
          whilePlaying={(...a) => this.whilePlaying(...a)}
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
              if (this.state.position < backLimit) {
                this.props.playPrevious();
              } else {
                this.resetPosition(this.state.currentUrl);
              }
            }
          }}
          togglePlayPause={() => this.props.togglePlayPause()}
          paused={this.props.paused}
          live={this.props.live}
          url={this.props.url}
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
  live: PropTypes.bool,
  offset: PropTypes.number,
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
  live: selectLive(),
  offset: selectOffset(),
  paused: selectPaused(),
  url: selectUrl(),
  playingTitle: selectPlayingTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateLiveTitle: () => dispatch(liveTitleUpdater()),
    togglePlayPause: () => dispatch(togglePlayPause()),
    resume: () => dispatch(resume()),
    pause: () => dispatch(pause()),
    playNext: () => dispatch(playNext()),
    playPrevious: () => dispatch(playPrevious()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
