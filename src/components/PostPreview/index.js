import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import styles from './styles.css';

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

  return (
    <div className={styles.postPreview}>
      <Link className={styles.imageLink} to={`/post/${props.slug}`}>
        <LazyLoad height={350} offset={100} once>
          <img
            className={styles.image}
            src={props.coverPhotoUrl}
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
  coverPhotoUrl: PropTypes.string,
  categories: PropTypes.array,
};

export default PostPreview;
