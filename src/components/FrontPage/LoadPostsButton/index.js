import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import arrow from './assets/arrow_down.svg';

const LoadPostsButton = props => (
  <button className={styles.loadMore} onClick={props.loadPosts}>
    Last inn flere artikler
    <img src={arrow} alt="Arrow" className={styles.arrow} />
  </button>
);

LoadPostsButton.propTypes = {
  loadPosts: PropTypes.func.isRequired,
};

export default LoadPostsButton;
