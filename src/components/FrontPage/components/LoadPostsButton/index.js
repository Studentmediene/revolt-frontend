import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const LoadPostsButton = props => (
  <button className={styles.loadMore} onClick={props.loadPosts}>
    Last inn flere artikler
    <img
      src="/assets/arrow_down.svg"
      alt="Pointing arrow"
      className={styles.arrow}
    />
  </button>
);

LoadPostsButton.propTypes = {
  loadPosts: PropTypes.func.isRequired,
};

export default LoadPostsButton;
