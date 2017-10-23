import React from 'react';
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
  title: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  lead: React.PropTypes.string.isRequired,
  coverPhotoUrl: React.PropTypes.string,
};

export default PostPreview;
