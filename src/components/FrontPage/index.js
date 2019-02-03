import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
  selectPostOffset,
  selectHasLoaded,
} from './selectors';
import { loadFrontPagePosts } from './actions';

import styles from './styles.scss';
import Loader from 'components/Loader';
import LoadPostsButton from './LoadPostsButton';
import PostPreviewList from 'components/PostPreviewList';

export class FrontPage extends React.Component {
  static propTypes = {
    posts: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired,
    postOffset: PropTypes.number.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    if (!this.props.hasLoaded) {
      this.props.loadPosts(this.props.postOffset);
    }
  }

  render() {
    let posts;
    let loader = (
      <LoadPostsButton
        loadPosts={() => this.props.loadPosts(this.props.postOffset)}
      />
    );
    if (this.props.error) {
      return <div>Kunne ikke laste inn forsiden.</div>;
    }
    if (this.props.loading) {
      loader = <Loader />;
    }
    if (this.props.posts !== false) {
      // Sort the posts so that the last published posts are first
      posts = this.props.posts.sort((postA, postB) =>
        moment(postB.publishAt).diff(postA.publishAt),
      );
      posts = <PostPreviewList posts={this.props.posts} />;
    }
    return (
      <div>
        {posts}
        <div className={styles.loaderWrapper}>{loader}</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  loading: selectFrontPagePostsLoading(),
  error: selectFrontPagePostsError(),
  postOffset: selectPostOffset(),
  hasLoaded: selectHasLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: postOffset => dispatch(loadFrontPagePosts(postOffset)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
