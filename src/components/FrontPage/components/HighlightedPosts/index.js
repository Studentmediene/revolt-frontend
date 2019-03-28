import React from 'react';
import PropTypes from 'prop-types';

import ImageLink from 'components/common/ImageLink';
import styles from './styles.scss';

const HighlightedPosts = props => {
  if (props.posts) {
    const posts = props.posts.map(post => {
      return (
        <div key={post.title} className={styles.highlightedPost} key={post.id}>
          <ImageLink
            images={post.croppedImages}
            link={`/post/${post.slug}`}
            imageDescription={post.title}
          >
            <div className={styles.imageText}>{post.title}</div>
          </ImageLink>
        </div>
      );
    });
    // Add extra padding to end of array
    posts.push(<span className={styles.endPadding} key={'padding'} />);
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Anbefalte saker</h2>
        <div className={styles.postContainer}>{posts}</div>
      </div>
    );
  } else {
    return null;
  }
};

HighlightedPosts.propTypes = {
  posts: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        croppedImages: PropTypes.shape({
          small: PropTypes.string.isRequired,
          medium: PropTypes.string.isRequired,
          large: PropTypes.string.isRequired,
        }).isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ),
  ]).isRequired,
};

export default HighlightedPosts;
