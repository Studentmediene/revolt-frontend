import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import PlayPauseButton from '../../components/PlayPauseButton';
/* import AudioProgress from '../../components/AudioProgress';
import AudioControls from '../../components/AudioControls';
import SoundManager from '../../components/SoundManager'; */
import PlayingInfo from '../common/PlayingInfo';
import PlayingInfoExpanded from '../common/PlayingInfoExpanded';
import Expander from '../../../common/expanderbutton/Expander.js';
import {
  pause,
  resume,
  togglePlayPause,
  playNext,
  playPrevious,
  liveTitleUpdater,
} from '../../actions';
import {
  selectOffset,
  selectLive,
  selectPlayingTitle,
  selectPlayingShow,
  selectPaused,
  selectUrl,
  selectShowImage,
  selectPublishAt,
} from '../../selectors';
import styles from './styles.scss';
/* import { trackEvent } from '../../utils/analytics'; */

class PhonePlayer extends React.Component {
  constructor(props) {
    super(props);
    // Initial volume
    this.volume = 60;
    this.state = {
      expanded: false,
      height: '50px',
    };
  }

  convertSecondsToDisplayTime = number => {
    const date = moment.utc(number * 1000);
    if (date.hours() > 0) {
      return date.format('HH:mm:ss');
    }
    return date.format('mm:ss');
  };

  render() {
    /*  const expand = () => {
      this.setState({ expanded: true });
    }; */

    const getLiveImage = () =>
      'http://localhost:3000/media/uploads/images/RR_LOGO.png';
    let img =
      this.props.showImage && !this.props.live
        ? this.props.showImage
        : getLiveImage();

    const notExpandedRender = () => {
      return (
        <div className={styles.container}>
          <PlayingInfo
            showName={this.props.playingShow}
            episodeTitle={this.props.playingTitle}
            showImageURL={img}
            expand={() => this.setState({ expanded: true })}
            live={this.props.live}
          />
          <div className={styles.controlContainer}>
            <PlayPauseButton
              paused={this.props.paused}
              togglePlayPause={this.props.togglePlayPause}
            />
          </div>
        </div>
      );
    };

    const expandedRender = () => {
      const publishedAt = moment(this.props.publishAt);
      return (
        <div className={styles.expandedContainer}>
          <PlayingInfoExpanded
            showName={this.props.playingShow}
            episodeTitle={this.props.playingTitle}
            showImageURL={img}
            live={this.props.live}
            togglePlayPause={this.props.togglePlayPause}
            paused={this.props.paused}
            publishAt={publishedAt.format('DD.MM.YYYY')}
          />
          <h1 style={{ padding: '0 0 1rem 0', margin: '0' }}>
            <Expander
              expanded={false}
              expandFunction={() => this.setState({ expanded: false })}
            />
          </h1>
        </div>
      );
    };

    if (this.props.isServer) {
      return null;
    }
    if (this.state.expanded) {
      return expandedRender();
    }
    return notExpandedRender();
  }
}

PhonePlayer.propTypes = {
  live: PropTypes.bool,
  publishAt: PropTypes.string,
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

PhonePlayer.defaultProps = {
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
    playPrevious: () => dispatch(playPrevious())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhonePlayer);