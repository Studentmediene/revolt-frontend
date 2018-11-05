import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const SocialMediaButton = props => (
  <a target="_blank" rel="noopener noreferrer" href={props.link}>
    <img
      src={props.image}
      alt={props.text}
      className={styles.socialMediaButton}
    />
  </a>
);

SocialMediaButton.propTypes = {
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SocialMediaButton;
