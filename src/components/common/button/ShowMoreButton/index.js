import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const ShowMoreButton = props => (
  <button className={styles.showMoreButton} onClick={props.onClick}>
    {`${props.text} `}
    <img
      src="/assets/arrow_down.svg"
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
