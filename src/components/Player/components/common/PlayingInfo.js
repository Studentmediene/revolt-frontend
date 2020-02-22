import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlayingInfo.scss';

const PlayingInfo = ({ showName, episodeTitle, showImageURL }) => (
  <div className={styles.infoContainer}>
    <div className={styles.imgContainer}>
      <img className={styles.img} src={showImageURL} alt={showName} />
    </div>
    <div className={styles.text}>
      <h2 className={styles.showName}>{showName}</h2>
      <h3 className={styles.episodeTitle}>{episodeTitle}</h3>
    </div>
  </div>
);

PlayingInfo.propTypes = {
  showName: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  showImageURL: PropTypes.string.isRequired,
};

export default PlayingInfo;
