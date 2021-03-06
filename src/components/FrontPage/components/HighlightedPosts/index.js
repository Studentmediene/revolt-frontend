import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import ImageLink from 'components/common/ImageLink';

class HighlightedPosts extends React.Component {
  constructor(props) {
    super(props);

    this.drag = this.drag.bind(this);
    this.dragStart = this.dragStart.bind(this);

    // fields for keeping state while dragging
    this.postContainerRef = React.createRef();
    this.initialPointerX = null;
    this.initialContainerScroll = null;
  }

  drag(event) {
    if (event.pageX === 0) {
      return;
    }
    const container = this.postContainerRef.current;
    const pointerMovement = event.pageX - this.initialPointerX;

    container.scrollTo({
      left: this.initialContainerScroll - pointerMovement,
    });
  }

  dragStart(event) {
    const dragGhostImage = new Image();
    dragGhostImage.src = '/assets/transparent-pixel.png';
    this.dragGhostImage = dragGhostImage;
    // Set the "ghost image" shown on drag to a transparent pixel
    event.nativeEvent.dataTransfer.setDragImage(this.dragGhostImage, 0, 0);

    // Save the initial position of pointer and container on drag start
    this.initialPointerX = event.pageX;
    this.initialContainerScroll = this.postContainerRef.current.scrollLeft;
  }
  render() {
    if (this.props.posts && !this.props.posts.isEmpty()) {
      const posts = this.props.posts.toJS().map(post => {
        return (
          <div key={post.id} className={styles.highlightedPost}>
            <ImageLink
              images={post.croppedImages}
              as={`/post/${post.slug}`}
              href={`/post/[slug]`}
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
          <h2 className={styles.title}>Vi anbefaler</h2>
          <div
            className={styles.postContainer}
            ref={this.postContainerRef}
            onDrag={this.drag}
            onDragStart={this.dragStart}
          >
            {posts}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

HighlightedPosts.propTypes = {
  posts: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default HighlightedPosts;
