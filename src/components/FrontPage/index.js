import React from 'react';
import moment from 'moment';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectFrontPagePosts,
  selectHighlightedPosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
  selectPostOffset,
  selectHasLoaded,
} from './selectors';
import Loader from 'components/Loader';
import { loadFrontPagePosts } from './actions';
import PostPreviewList from 'components/PostPreviewList';
import LoadPostsButton from './components/LoadPostsButton';

import styles from './styles.scss';

export class FrontPage extends React.Component {
  static propTypes = {
    posts: PropTypes.instanceOf(Immutable.List).isRequired,
    highlightedPosts: PropTypes.instanceOf(Immutable.List).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired,
    postOffset: PropTypes.number.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
  };

  static async getInitialProps({ store }) {
    if (!selectHasLoaded()(store.getState())) {
      store.dispatch(loadFrontPagePosts(0));
    }
    return {};
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
      posts = (
        <PostPreviewList
          posts={this.props.posts}
          highlightedPosts={this.props.highlightedPosts}
        />
      );
    }
    return (
      <React.Fragment>
        {posts}
        <div className={styles.loaderWrapper}>{loader}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  highlightedPosts: selectHighlightedPosts(),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontPage);
