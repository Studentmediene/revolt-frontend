import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlayPauseButton from './components/PlayPauseButton';
import AudioProgress from './components/AudioProgress';
import AudioControls from './components/AudioControls';
import SoundManager from './components/SoundManager';
import PlayingInfo from './components/PlayingInfo';
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
  selectPlayingShow,
  selectPaused,
  selectUrl,
  selectShowImage,
} from './selectors';
import styles from './styles.scss';
import { trackEvent } from 'utils/analytics';

class Player extends React.Component {
  constructor(props) {
    super(props);
    // Initial volume
    this.volume = 60;
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
        <PlayingInfo
          showName={this.props.playingShow}
          episodeTitle={this.props.playingTitle}
          showImageURL={this.props.showImage}
        />
        <div className={styles.controlContainer}>
          <PlayPauseButton
            paused={this.props.paused}
            togglePlayPause={this.props.togglePlayPause}
          />
        </div>
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
  playingShow: PropTypes.string,
  showImage: PropTypes.string,
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
  playingShow: selectPlayingShow(),
  showImage: selectShowImage(),
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
