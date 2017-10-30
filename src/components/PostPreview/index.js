import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const PostPreview = props => (
  <div className={styles.postPreview}>
    <Link className={styles.imageLink} to={`/post/${props.slug}`}>
      <img
        className={styles.image}
        src={props.coverPhotoUrl}
        alt={props.title}
      />
    </Link>
    <Link className={styles.titleLink} to={`/post/${props.slug}`}>
      <h2 className={styles.title}>{props.title}</h2>
    </Link>
    <p className={styles.lead}>{props.lead}</p>
  </div>
);

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  coverPhotoUrl: PropTypes.string,
};

export default PostPreview;
