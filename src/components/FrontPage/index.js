import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
  selectPageNumber,
} from './selectors';
import { loadFrontPagePosts } from './actions';

import Loader from 'components/Loader';
import PostPreviewList from 'components/PostPreviewList';

export class FrontPage extends React.Component {
  componentWillMount() {
    this.props.loadPosts(this.props.pageNumber);
  }

  render() {
    let posts;
    if (this.props.posts !== false) {
      // Sort the posts so that the latest posts is first
      posts = this.props.posts.sort((postA, postB) =>
        moment(postB.publishAt).diff(postA.publishAt),
      );
      posts = <PostPreviewList posts={this.props.posts} />;
    } else {
      return <Loader />;
    }
    return (
      <div className={styles.frontPage}>
        {posts}
        <div className={styles.buttonWrap}>
          <button
            className={styles.loadMore}
            onClick={() => this.props.loadPosts(this.props.pageNumber)}
          >
            Last inn flere artikler
          </button>
        </div>
      </div>
    );
  }
}

FrontPage.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  loadPosts: PropTypes.func,
  pageNumber: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  loading: selectFrontPagePostsLoading(),
  error: selectFrontPagePostsError(),
  pageNumber: selectPageNumber(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: pageNumber => dispatch(loadFrontPagePosts(pageNumber)),
    dispatch,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FrontPage),
);
