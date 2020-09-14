import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/* for mobile */
import moment from 'moment';
import classnames from 'classnames';
import PhoneStyles from './PhoneStyles.scss';
import PlayPauseButton from './components/PlayPauseButton';
import PlayingInfo from './components/common/PlayingInfo';
import PlayingInfoExpanded from './components/common/PlayingInfoExpanded';
import Expander from '../common/expanderbutton/Expander.js';

/* for mobile and desktop */
import SoundManager from './components/SoundManager';
import AudioProgress from './components/AudioProgress';
import AudioControls from './components/AudioControls';
import DesktopStyles from './DesktopStyles.scss';

import {
  pause,
  resume,
  togglePlayPause,
  playNext,
  playPrevious,
  liveTitleUpdater
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
  selectIndex,
  selectPlaylist
} from './selectors';

import { trackEvent } from 'utils/analytics';

/* There is a mobile (Ipad size and smaller) and a desktop version of the player. The desktop player is going to be updated to use the same components and logic as 
the mobile version */
const Player = props => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [sound, setSound] = useState({
    currentUrl: '',
    position: 0,
    duration: 0,
    volume: 80
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    //equal to componentDidMount and componentDidUpdate
    props.updateLiveTitle();
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    resetPosition(props.url);

    //equal to componentWillUnmount
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, [props.url]);

  /* need to use callback, else we will spawn a new function each time we click the button */
  const skipAhead = useCallback(
    () =>
      setSound(sound => ({
        ...sound,
        position: Math.min(sound.position + 30 * 1000, sound.duration)
      })),
    [sound.position]
  );

  const skipBackwards = useCallback(
    () =>
      setSound(sound => ({
        ...sound,
        position: Math.max(0, sound.position - 10 * 1000)
      })),
    [sound.position]
  );

  const getShowImage = () => {
    const getLiveImage = () => '/assets/RR_logo.png';
    return props.showImage && !props.live ? props.showImage : getLiveImage();
  };

  const updateWindowDimensions = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const resetPosition = () => {
    setSound(state => ({ ...state, position: 0 }));
  };

  const onSeek = seekPosition => {
    setSound(state => ({ ...state, position: seekPosition }));
  };

  const whilePlaying = soundObject => {
    setSound(state => ({
      ...state,
      position: soundObject.position,
      duration: soundObject.duration
    }));
  };

  const toggleExpander = e => {
    e.preventDefault();
    trackEvent('expanded', 'toggle expaned player');
    setExpanded(state => !state);
  };

  const audioControls = (
    <AudioControls
      playNext={() => {
        trackEvent('player', 'play next song');
        props.playNext();
      }}
      playPrevious={() => {
        trackEvent('player', 'play previous sond');
        if (!props.live) {
          const backLimit = 2 * 1000; // two seconds
          if (sound.position < backLimit) {
            props.playPrevious();
          } else {
            resetPosition(sound.currentUrl);
          }
        }
      }}
      togglePlayPause={() => {
        trackEvent('player', 'toggle play/pause');
        props.togglePlayPause();
      }}
      paused={props.paused}
      live={props.live}
      url={props.url}
      skipAhead={skipAhead}
      skipBackwards={skipBackwards}
      isLatestEpisodeInPlaylist={props.index === props.playlist.length - 1}
      isFirstEpisodeInPlaylist={props.index === 0}
    />
  );

  /* Method for handling the expanded version of the player */
  const expandedRender = () => {
    const publishedAt = moment(props.publishAt);
    return (
      <div
        className={classnames(PhoneStyles.expandedContainer, {
          [PhoneStyles.hidden]: !expanded,
          [PhoneStyles.expanded]: expanded
        })}
      >
        <PlayingInfoExpanded
          showName={props.playingShow}
          episodeTitle={props.playingTitle}
          showImageURL={getShowImage()}
          live={props.live}
          paused={props.paused}
          publishAt={
            publishedAt.isValid() ? publishedAt.format('DD.MM.YYYY') : null
          }
          url={props.url}
          position={sound.position}
          duration={sound.duration}
          onSeek={position => onSeek(position)}
          playNext={() => {
            trackEvent('player', 'play next song');
            props.playNext();
          }}
          playPrevious={() => {
            trackEvent('player', 'play previous sond');
            if (!props.live) {
              const backLimit = 2 * 1000; // two seconds
              if (sound.position < backLimit) {
                props.playPrevious();
              } else {
                resetPosition(sound.currentUrl);
              }
            }
          }}
          togglePlayPause={() => {
            trackEvent('player', 'toggle play/pause');
            props.togglePlayPause();
          }}
          audioControls={audioControls}
        />
        <h1 onClick={toggleExpander} className={PhoneStyles.expanderButton}>
          <Expander
            expanded={false} //to point arrow down
          />
        </h1>
      </div>
    );
  };

  const isMobile = size.width <= 800; // (800) same as $breakpoint-medium in main variables.scss file
  let progressBarWidth = `${(sound.position / sound.duration) * 100}%`;
  if (props.live) {
    progressBarWidth = `0%`;
  } else if (!props.url || sound.duration < 100) {
    // Audio either hasn't loading or is playing blank.mp3
    progressBarWidth = '0%';
  }
  const audioProgressStyle = {
    width: progressBarWidth
  };

  return (
    //the soundmanager is shared between desktop and mobile. This makes the playback not break when scaling the site
    <React.Fragment>
      <SoundManager
        url={props.url}
        paused={props.paused}
        volume={sound.volume}
        position={sound.position}
        whilePlaying={(...a) => whilePlaying(...a)}
        onPause={() => {
          props.pause();
        }}
        onResume={() => {
          props.resume();
        }}
        onFinishedPlaying={() => {
          props.playNext();
        }}
      />
      {isMobile ? (
        /* start of phone player */
        <React.Fragment>
          {expandedRender()}
          <div className={PhoneStyles.metaContainer}>
            <div className={PhoneStyles.timeline} style={audioProgressStyle} />
            <div className={PhoneStyles.container}>
              <PlayingInfo
                showName={props.playingShow}
                episodeTitle={props.playingTitle}
                showImageURL={getShowImage()}
                expand={toggleExpander}
                live={props.live}
              />
              <div className={PhoneStyles.controlContainer}>
                <PlayPauseButton
                  paused={props.paused}
                  togglePlayPause={props.togglePlayPause}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        /* end of phone player */
        /* start of desktop player */
        <div className={DesktopStyles.container} title={props.playingTitle}>
          {audioControls}
          <AudioProgress
            displayText={props.playingTitle}
            live={props.live}
            paused={props.paused}
            url={props.url}
            position={sound.position}
            durationEstimate={sound.duration}
            onSeek={position => onSeek(position)}
          />
        </div>
        /* end of desktop player */
      )}
    </React.Fragment>
  );
};

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
  publishAt: PropTypes.string,
  updateLiveTitle: PropTypes.func.isRequired,
  index: PropTypes.number,
  playlist: PropTypes.array
};

Player.defaultProps = {
  paused: true,
  url: null
};

Player.getInitialProps = ({ isServer }) => {
  return { isServer };
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
  index: selectIndex(),
  playlist: selectPlaylist()
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
  mapDispatchToProps
)(Player);
