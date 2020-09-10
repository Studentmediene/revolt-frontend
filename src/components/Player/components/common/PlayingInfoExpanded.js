import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlayingInfoExpanded.scss';

import PlayerProgressFunctional from '../common/PlayerProgressFunctional';

import LiveTag from './LiveTag';

const PlayingInfoExpanded = ({
  showName,
  episodeTitle,
  showImageURL,
  publishAt,
  live,
  paused,
  onSeek,
  url,
  position,
  duration,
  audioControls,
}) => (
  <div className={styles.Container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={showImageURL} alt={showName} />
      </div>
      {live ? (
        <span>
          <h2 className={styles.showName}>{episodeTitle}</h2>
          <LiveTag />
        </span>
      ) : (
        <span className={styles.text}>
          <h2 className={styles.showName}>{showName}</h2>
          <h3 className={styles.episodeTitle}>{episodeTitle}</h3>
          <h3 className={styles.date}>{publishAt ? publishAt : ''}</h3>
        </span>
      )}
    </div>
    <div className={styles.controls}>
      {!live ? (
        <PlayerProgressFunctional
          onSeek={position => onSeek(position)}
          live={live}
          paused={paused}
          url={url}
          position={position}
          duration={duration}
        />
      ) : (
        <div />
      )}
      {audioControls}
    </div>
  </div>
);

PlayingInfoExpanded.propTypes = {
  showName: PropTypes.string,
  episodeTitle: PropTypes.string.isRequired,
  showImageURL: PropTypes.string,
  publishAt: PropTypes.string,
  live: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func,
  paused: PropTypes.bool.isRequired,
  onSeek: PropTypes.func.isRequired,
  url: PropTypes.string,
  duration: PropTypes.number,
  position: PropTypes.number.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrevious: PropTypes.func.isRequired,
  audioControls: PropTypes.element.isRequired,
};

export default PlayingInfoExpanded;
