import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const PostPreview = props => {
  let categories;
  if (props.categories && props.categories.length > 0) {
    categories = props.categories.map((category, index) => (
      <div
        key={category.name}
        className={styles.category}
        style={{
          marginTop: `-${(index + 1) * 2}em`,
          backgroundColor: `${category.backgroundColor}`,
          color: `${category.textColor}`,
        }}
      >
        {category.name}
      </div>
    ));
  }

  const { small, medium, large } = props.croppedImages;

  return (
    <div className={styles.postPreview}>
      <Link className={styles.imageLink} to={`/post/${props.slug}`}>
        <LazyLoad height={350} offset={100} once>
          <img
            className={styles.image}
            srcSet={`${large} 1024w, ${medium} 768w, ${small} 300w`}
            src={large}
            alt={props.title}
          />
        </LazyLoad>
        {categories}
      </Link>
      <Link className={styles.titleLink} to={`/post/${props.slug}`}>
        <h2 className={styles.title}>{props.title}</h2>
      </Link>
      <p className={styles.lead}>{props.lead}</p>
    </div>
  );
};

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  croppedImages: PropTypes.shape({
    small: PropTypes.string,
    medium: PropTypes.string,
    large: PropTypes.string,
  }),
  categories: PropTypes.array,
};

export default PostPreview;
