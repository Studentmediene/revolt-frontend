import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const ImageLink = props => {
  const { small, medium, large } = props.images;
  return (
    <Link to={props.link}>
      <LazyLoad height={350} offset={100} once>
        <img
          className={styles.image}
          srcSet={`${large} 1024w, ${medium} 768w, ${small} 300w`}
          src={large}
          alt={props.imageDescription}
        />
      </LazyLoad>
      {props.children}
    </Link>
  );
};

ImageLink.propTypes = {
  images: PropTypes.shape({
    small: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ImageLink;
