import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const HighlightedPosts = props => {
  if (props.posts) {
    const posts = props.posts.map(post => {
      const { small, medium, large } = post.croppedImages;
      return (
        <div key={post.title} className={styles.highlightedPost}>
          <Link to={`/post/${props.slug}`}>
            <LazyLoad height={350} offset={100} once>
              <img
                className={styles.image}
                srcSet={`${large} 1024w, ${medium} 768w, ${small} 300w`}
                src={large}
                alt={props.title}
              />
            </LazyLoad>
          </Link>
        </div>
      );
    });
    // Add extra padding to beginning and end of array
    //posts.unshift(<div className={styles.endPadding} />);
    posts.push(<span className={styles.endPadding} />);
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
  posts: PropTypes.array.isRequired,
};

export default HighlightedPosts;
