import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';
import PostPreview from 'components/PostPreview';
import HighlightedPosts from 'components/FrontPage/components/HighlightedPosts';

const PostPreviewList = props => {
  const posts = props.posts.map((post, index) => (
    <div
      className={classNames({
        [styles.post]: true,
        [styles.postLarge]: index % 8 === 0 || index % 8 === 3,
      })}
      key={index}
    >
      <PostPreview {...post} />
    </div>
  ));
  if (props.highlightedPosts) {
    // Insert highlighted posts after element 3
    posts.splice(3, 0, <HighlightedPosts posts={props.highlightedPosts} />);
  }

  return <div className={styles.postPreviewList}>{posts}</div>;
};

PostPreviewList.propTypes = {
  posts: PropTypes.array.isRequired,
  highlightedPosts: PropTypes.array.isRequired,
};

export default PostPreviewList;
