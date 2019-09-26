import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';
import PostPreview from 'components/PostPreview';
import HighlightedPosts from 'components/FrontPage/components/HighlightedPosts';
import HighlightedShows from 'components/FrontPage/components/HighlightedShows';

const PostPreviewList = props => {
  const posts = props.posts.toJS().map((post, index) => (
    <div
      className={classNames(styles.post, {
        [styles.postLarge]: index % 8 === 0 || index % 8 === 3,
      })}
      key={index}
    >
      <PostPreview {...post} />
    </div>
  ));
  posts.splice(
    2,
    0,
    <HighlightedShows
      //shows={{"test1", "test2", "test3"}}
      key={'highlightedShows'}
    />,
  );
  if (!props.highlightedPosts.isEmpty()) {
    // Insert highlighted posts after element 3
    posts.splice(
      3,
      0,
      <HighlightedPosts
        posts={props.highlightedPosts}
        key={'highlightedPosts'}
      />,
    );
  }

  return <div className={styles.postPreviewList}>{posts}</div>;
};

PostPreviewList.propTypes = {
  posts: PropTypes.instanceOf(Immutable.List).isRequired,
  highlightedPosts: PropTypes.instanceOf(Immutable.List),
};

export default PostPreviewList;
