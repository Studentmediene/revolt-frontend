import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlayingInfoExpanded.scss';

import PlayerProgress from '../common/PlayerProgress';
import LiveTag from '../common/LiveTag';
import AudioControls from '../AudioControls';

const PlayingInfoExpanded = ({
  showName,
  episodeTitle,
  showImageURL,
  publishAt,
  live,
  togglePlayPause,
  paused,
  onSeek,
  url,
  position,
  durationEstimate,

}) => (
  <div className={styles.Container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={showImageURL} alt={showName} />
      </div>
      {live ? (
        <h2 className={styles.showName}>{episodeTitle}</h2>
      ) : (
        <React.Fragment>
          <h2 className={styles.showName}>{showName}</h2>
          <h3 className={styles.episodeTitle}>{episodeTitle}</h3>
          <h3 className={styles.date}>{publishAt}</h3>
        </React.Fragment>
      )}
    </div>
    <div className={styles.controls}>
      <PlayerProgress
        onSeek={position => onSeek(position)}
        live={live}
        paused={paused}
        url={url}
        position={position}
        durationEstimate={durationEstimate}
      />
      {live ? <LiveTag /> : <div className={styles.time}>20:03 / 59:30</div>}
      <AudioControls togglePlayPause={togglePlayPause} paused={paused} />
    </div>
  </div>
);

PlayingInfoExpanded.propTypes = {
  showName: PropTypes.string,
  episodeTitle: PropTypes.string.isRequired,
  showImageURL: PropTypes.string,
  publishAt: PropTypes.string,
  live: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.togglePlayPause,
  paused: PropTypes.bool.isRequired,
  onSeek: PropTypes.func.isRequired,
  url: PropTypes.string,
  durationEstimate: PropTypes.number,
  position: PropTypes.number.isRequired,
};

export default PlayingInfoExpanded;
