import React from 'react';
import styles from './PlayerProgress.scss';

import { Component } from 'react';

export default class PlayerProgress extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.timelineContainer}>
        <div id={styles.timeline}>
          <div id={styles.handle} />
        </div>
      </div>
    );
  }
}
