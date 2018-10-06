import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  selectFrontPagePosts,
  selectFrontPagePostsLoading,
  selectFrontPagePostsError,
  selectPageNumber,
  selectHasLoaded,
} from './selectors';
import { loadFrontPagePosts } from './actions';
import styles from './styles.css';
import facebookLogo from './Assets/facebook.svg';
import instagramLogo from './Assets/instagram.svg';

import Loader from 'components/Loader';
import LoadPostsButton from './LoadPostsButton';
import PostPreviewList from 'components/PostPreviewList';

export class FrontPage extends React.Component {
  static propTypes = {
    posts: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    if (!this.props.hasLoaded) {
      this.props.loadPosts(this.props.pageNumber);
    }
  }

  render() {
    let posts;
    let socialMedia;
    let loader = (
      <LoadPostsButton
        loadPosts={() => this.props.loadPosts(this.props.pageNumber)}
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
      socialMedia = (
        <div className={styles.socialMedia}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/radiorevolt.no/"
          >
            <img
              src={facebookLogo}
              alt="Facebook"
              className={styles.facebookLogo}
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/radiorevolt/"
          >
            <img
              src={instagramLogo}
              alt="Instagram"
              className={styles.instagramLogo}
            />
          </a>
        </div>
      );
    }
    return (
      <div>
        {posts}
        {socialMedia}
        <div className={styles.loaderWrapper}>{loader}</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  loading: selectFrontPagePostsLoading(),
  error: selectFrontPagePostsError(),
  pageNumber: selectPageNumber(),
  hasLoaded: selectHasLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: pageNumber => dispatch(loadFrontPagePosts(pageNumber)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
