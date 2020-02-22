import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlayingInfoExpanded.scss';

import PlayerProgress from '../common/PlayerProgress';
import AudioControls from '../AudioControls';

const PlayingInfoExpanded = ({
  showName,
  episodeTitle,
  showImageURL,
  published,
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
      <div className={styles.progress}>|------------------O------|</div>
      {/* <PlayerProgress /> */}
      <div className={styles.time}>20:03 / 59:30</div>
      <AudioControls />
    </div>
  </div>
);

PlayingInfoExpanded.propTypes = {
  showName: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  showImageURL: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
};

export default PlayingInfoExpanded;
