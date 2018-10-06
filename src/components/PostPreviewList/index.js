import React from 'react';
import PropTypes from 'prop-types';

import PostPreview from 'components/PostPreview';
import styles from './styles.css';

const PostPreviewList = props => {
  const posts = props.posts.map((post, index) => (
    <div className={styles.post} key={`post-${index}`}>
      <PostPreview {...post} />
    </div>
  ));
  return <div className={styles.postPreviewList}>{posts}</div>;
};

PostPreviewList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostPreviewList;
