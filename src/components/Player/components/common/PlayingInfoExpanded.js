import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './PlayingInfoExpanded.scss';
import PhoneStyles from '../../PhoneStyles.scss';
import CloseButton from './CloseButton';
import Expander from '../../../common/expanderbutton/Expander';

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
  expanded,
  isMobile,
  toggleExpander
}) => (
  <>
    <div
      className={classnames(styles.expandedContainer, {
        [styles.hidden]: !expanded,
        [styles.expanded]: expanded
      })}
    >
      {isMobile ? (
        <div onClick={toggleExpander} className={PhoneStyles.closeButton}>
          <CloseButton />
        </div>
      ) : null}
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
        
        <div className={styles.progressAndControls}>
          {!live ? (
            <div className={styles.progress}>
            <PlayerProgressFunctional
              onSeek={position => onSeek(position)}
              live={live}
              paused={paused}
              url={url}
              position={position}
              duration={duration}
            />
            </div>
          ) : (
            <div />
          )}
          <div className={styles.controls}>
            {audioControls}
            </div>
            {!isMobile ? (
              <div onClick={toggleExpander} className={styles.expanderButton}>
              <Expander
                expanded={false} //to point arrow down
              />
            </div>
            ) : null}
          </div>
        </div>
      </div>
  </>
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
  audioControls: PropTypes.element.isRequired
};

export default PlayingInfoExpanded;
