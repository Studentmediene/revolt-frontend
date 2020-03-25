import React from 'react';
/* import ReactDom from 'react-dom'; */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SoundManager from './components/SoundManager';
import PhonePlayer from './components/PhonePlayer/PhonePlayer';
import DesktopPlayer from './components/DesktopPlayer/index';
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
/* import styles from './styles.scss';
import { trackEvent } from 'utils/analytics'; */

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0, // Used to determine when to reset player position
      currentUrl: '',
      // Number of seconds played
      position: 0,
      // Duration of the audio (estimate)
      duration: 0,
      volume: 80,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    /* same as $breakpoint-medium in main variables.scss file */
    const isMobile = this.state.width <= 800;
    const position = this.state.position;
    return (
      <React.Fragment>
        <SoundManager
          url={this.props.url}
          paused={this.props.paused}
          volume={this.state.volume}
          position={position}
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
        {isMobile ? (
          <PhonePlayer onSeek={position => this.onSeek(position)} />
        ) : (
          <DesktopPlayer />
        )}
      </React.Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
