import React from 'react';
import styles from './PlayerProgress.scss';

const PlayerProgress = () => {
  return (
    <div className={styles.timelineContainer}>
      <div id={styles.timeline}>
        <div id={styles.handle} />
      </div>
    </div>
  );
};

export default PlayerProgress;
