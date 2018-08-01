import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import styles from './styles.css';
import {
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
} from './selectors';
import { loadFrontPagePosts } from './actions';

import Loader from 'components/Loader';
import PostPreviewList from 'components/PostPreviewList';

export class FrontPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadPosts();
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
    return <div className={styles.frontPage}>{posts}</div>;
  }
}

FrontPage.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  loadPosts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  loading: selectFrontPagePostsLoading(),
  error: selectFrontPagePostsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadFrontPagePosts()),
    dispatch,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FrontPage),
);
