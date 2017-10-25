import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Episode = props => {
  if (props.digasBroadcastId === 0) {
    return null;
  }

  const playOnDemand = e => {
    e.preventDefault();
    props.playOnDemand(props.id);
  };

  return (
    <button
      className={styles.episode}
      onClick={playOnDemand}
      onKeyPress={playOnDemand}
    >
      <div className={styles.playButton}>
        <div className={styles.playButtonInner} />
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.lead}>{props.lead}</div>
      </div>
    </button>
  );
};

Episode.propTypes = {
  digasBroadcastId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  lead: PropTypes.string,
  playOnDemand: PropTypes.func,
};

export default Episode;
