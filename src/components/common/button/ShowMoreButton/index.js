import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';
import arrowImage from './arrow-down.svg';

const ShowMoreButton = props => (
  <button className={styles.showMoreButton} onClick={props.onClick}>
    {`${props.text} `}
    <img
      src={arrowImage}
      alt="Arrow"
      className={classNames(styles.arrow, {
        [styles.rotated]: props.active,
      })}
    />
  </button>
);

ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default ShowMoreButton;
