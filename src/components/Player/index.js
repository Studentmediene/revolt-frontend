/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
/* import ReactDom from 'react-dom'; */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlayPauseButton from './components/PlayPauseButton';
import PlayingInfo from './components/common/PlayingInfo';
import PlayingInfoExpanded from './components/common/PlayingInfoExpanded';
import Expander from '../common/expanderbutton/Expander.js';

/* for mobile */
import moment from 'moment';
import classnames from 'classnames';
import PhoneStyles from './components/PhonePlayer/styles.scss';

import SoundManager from './components/SoundManager';
import AudioProgress from './components/AudioProgress';
import AudioControls from './components/AudioControls';
import DesktopStyles from './components/DesktopPlayer/styles.scss';

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
  selectPublishAt,
} from './selectors';

import { trackEvent } from 'utils/analytics';

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
      expanded: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getShowImage = this.getShowImage.bind(this);
    this.expandedRender = this.expandedRender.bind(this);
  }

  static async getInitialProps({ isServer }) {
    return { isServer };
  }

  componentDidMount() {
    this.props.updateLiveTitle();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  getShowImage() {
    const getLiveImage = () =>
      'http://localhost:3000/media/uploads/images/RR_LOGO.png';
    return this.props.showImage && !this.props.live
      ? this.props.showImage
      : getLiveImage();
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

  convertSecondsToDisplayTime = number => {
    const date = moment.utc(number * 1000);
    if (date.hours() > 0) {
      return date.format('HH:mm:ss');
    }
    return date.format('mm:ss');
  };

  /* Method for handling the expanded version of the player */
  expandedRender() {
    const publishedAt = moment(this.props.publishAt);
    return (
      <div
        className={classnames(PhoneStyles.expandedContainer, {
          [PhoneStyles.hidden]: !this.state.expanded,
          [PhoneStyles.expanded]: this.state.expanded,
        })}
      >
        <PlayingInfoExpanded
          showName={this.props.playingShow}
          episodeTitle={this.props.playingTitle}
          showImageURL={this.getShowImage()}
          live={this.props.live}
          paused={this.props.paused}
          publishAt={publishedAt.format('DD.MM.YYYY')}
          url={this.props.url}
          position={this.state.position}
          durationEstimate={this.state.durationEstimate}
          onSeek={position => this.onSeek(position)}

          playNext={() => {
            trackEvent('player', 'play next song');
            this.props.playNext();
          }}
          playPrevious={() => {
            trackEvent('player', 'play previous sond');
            if (!this.props.live) {
              const backLimit = 2 * 1000; // two seconds
              if (this.state.position < backLimit) {
                this.props.playPrevious();
              } else {
                this.resetPosition(this.state.currentUrl);
              }
            }
          }}
          togglePlayPause={() => {
            trackEvent('player', 'toggle play/pause');
            this.props.togglePlayPause();
          }}
          displayText={this.props.playingTitle}
        />
        <h1
          onClick={() => this.setState({ expanded: false })}
          className={PhoneStyles.expanderButton}
        >
          <Expander
            expanded={false} //to point arrow down
          />
        </h1>
      </div>
    );
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
          /* start of phone player */
          <React.Fragment>
            {this.expandedRender()}
            <div className={PhoneStyles.container}>
              <PlayingInfo
                showName={this.props.playingShow}
                episodeTitle={this.props.playingTitle}
                showImageURL={this.getShowImage()}
                expand={() => this.setState({ expanded: true })}
                live={this.props.live}
              />
              <div className={PhoneStyles.controlContainer}>
                <PlayPauseButton
                  paused={this.props.paused}
                  togglePlayPause={this.props.togglePlayPause}
                />
              </div>
            </div>
          </React.Fragment>
        ) : (
          /* end of phone player */
          /* start of desktop player */
          <div
            className={DesktopStyles.container}
            title={this.props.playingTitle}
          >
            <AudioControls
              playNext={() => {
                trackEvent('player', 'play next song');
                this.props.playNext();
              }}
              playPrevious={() => {
                trackEvent('player', 'play previous sond');
                if (!this.props.live) {
                  const backLimit = 2 * 1000; // two seconds
                  if (this.state.position < backLimit) {
                    this.props.playPrevious();
                  } else {
                    this.resetPosition(this.state.currentUrl);
                  }
                }
              }}
              togglePlayPause={() => {
                trackEvent('player', 'toggle play/pause');
                this.props.togglePlayPause();
              }}
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
          /* end of desktop player */
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
  publishAt: PropTypes.bool,
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
  publishAt: selectPublishAt(),
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
