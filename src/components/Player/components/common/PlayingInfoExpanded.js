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
  published,
  live,
  togglePlayPause,
  paused,
}) => (
  <div className={styles.Container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={showImageURL} alt={showName} />
      </div>
      <h2 className={styles.showName}>{showName}</h2>
      <h3 className={styles.episodeTitle}>{episodeTitle}</h3>
      <h3 className={styles.date}>{published}</h3>
    </div>
    <div className={styles.controls}>
      <PlayerProgress />
      {live ? <LiveTag /> : <div className={styles.time}>20:03 / 59:30</div>}
      <AudioControls togglePlayPause={togglePlayPause} paused={paused} />
    </div>
  </div>
);

PlayingInfoExpanded.propTypes = {
  showName: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  showImageURL: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  live: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.togglePlayPause,
  paused: PropTypes.bool.isRequired,
};

export default PlayingInfoExpanded;
