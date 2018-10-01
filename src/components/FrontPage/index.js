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
} from './selectors';
import { loadFrontPagePosts } from './actions';
import styles from './styles.css';
import facebookLogo from './Assets/facebook.svg';
import instagramLogo from './Assets/instagram.svg';

import Loader from 'components/Loader';
import PostPreviewList from 'components/PostPreviewList';

export class FrontPage extends React.Component {
  static propTypes = {
    posts: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.props.loadPosts(this.props.pageNumber);
  }

  render() {
    let posts;
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn forsiden.</div>;
    } else if (this.props.posts !== false) {
      // Sort the posts so that the latest posts is first
      posts = this.props.posts.sort((postA, postB) =>
        moment(postB.publishAt).diff(postA.publishAt),
      );
      posts = <PostPreviewList posts={this.props.posts} />;

      return (
        <div className={styles.frontPage}>
          {posts}
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
    } else {
      // Render loading component before load actually starts.
      return <Loader />;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  posts: selectFrontPagePosts(),
  loading: selectFrontPagePostsLoading(),
  error: selectFrontPagePostsError(),
  pageNumber: selectPageNumber(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: pageNumber => dispatch(loadFrontPagePosts(pageNumber)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
