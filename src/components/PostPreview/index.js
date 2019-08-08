import React from 'react';
import PropTypes from 'prop-types';

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
    <ImageLink
      images={props.croppedImages}
      link={`/post/${props.slug}`}
      imageDescription=""
      className={styles.link}
    >
      {categories}
      <h2 className={styles.title}>{props.title}</h2>
    </ImageLink>
  );
};

PostPreview.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  croppedImages: PropTypes.shape({
    small: PropTypes.string,
    medium: PropTypes.string,
    large: PropTypes.string,
  }),
  categories: PropTypes.array,
};

export default PostPreview;
