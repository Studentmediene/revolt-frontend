import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PostPreview from 'components/PostPreview';
import styles from './styles.scss';

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

  return <div className={styles.postPreviewList}>{posts}</div>;
};

PostPreviewList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostPreviewList;
