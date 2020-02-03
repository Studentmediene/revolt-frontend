import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './PlayPauseButton.scss';

import SrOnly from 'components/common/SrOnly';

const PlayPauseButton = ({ togglePlayPause, paused, black}) => {
  // Label for our screenreader friends
  const label = paused ? 'Spill av' : 'Pause';

  const contents = (
    <div className={styles.buttonContainer}>
      <div
        className={classNames(styles.left, {
          [styles.paused]: paused,
          [styles.black]: black,
        })}
      />
      <div
        className={classNames(styles.right, {
          [styles.paused]: paused,
          [styles.black]: black,
        })}
      />
      <SrOnly>{label}</SrOnly>
    </div>
  );

  // Use a <button> if we are interactive, else nothing
  if (togglePlayPause) {
    return (
      <button className={styles.playPauseButton} onClick={togglePlayPause}>
        {contents}
      </button>
    );
  } else {
    return contents;
  }
};

PlayPauseButton.propTypes = {
  togglePlayPause: PropTypes.func,
  paused: PropTypes.bool.isRequired,
  black: PropTypes.bool,
};

export default PlayPauseButton;
