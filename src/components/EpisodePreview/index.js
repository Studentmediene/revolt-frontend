import React from 'react';
import moment from 'moment';

import styles from './styles.css';

const getNormalizedDateString = dateString => {
  const paddedString = i => (i < 10 ? `0${i}` : `${i}`);

  const date = moment(dateString);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return `${paddedString(day)}.${paddedString(month)}.${year}`;
};

function EpisodePreview(props) {
  return (
    <div className={styles.episodePreview}>
      <div className={styles.playButton}>
        <div className={styles.playButtonInner} />
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>
          {props.showName} {getNormalizedDateString(props.publishAt)}
        </div>
        <div className={styles.lead}>{props.lead}</div>
      </div>
    </div>
  );
}

EpisodePreview.propTypes = {
  showName: React.PropTypes.string,
  publishAt: React.PropTypes.string,
  lead: React.PropTypes.string,
};

export default EpisodePreview;
