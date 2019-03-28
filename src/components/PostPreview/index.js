import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import styles from './styles.scss';
import ImageLink from 'components/common/ImageLink';
import CategoryTag from 'components/common/tag/CategoryTag';

const PostPreview = props => {
  let categories;
  if (props.categories && props.categories.length > 0) {
    categories = props.categories.map((category, index) => (
      <CategoryTag
        {...category}
        index={index}
        position={'bottom'}
        key={index}
      />
    ));
  }

  return (
    <div className={styles.postPreview}>
      <ImageLink
        images={props.croppedImages}
        link={`/post/${props.slug}`}
        imageDescription={props.title}
      >
        {categories}
      </ImageLink>
      <Link className={styles.titleLink} to={`/post/${props.slug}`}>
        <h2 className={styles.title}>{props.title}</h2>
      </Link>
    </div>
  );
};

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  croppedImages: PropTypes.shape({
    small: PropTypes.string,
    medium: PropTypes.string,
    large: PropTypes.string,
  }),
  categories: PropTypes.array,
};

export default PostPreview;
