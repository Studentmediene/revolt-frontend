import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { getNormalizedDateString } from 'utils/dateUtils';
import { selectPost, selectPostLoading, selectPostError } from './selectors';
import { loadPost } from './actions';
import styles from './styles.css';

export class Post extends React.Component {
  componentWillMount() {
    this.props.loadPost(this.props.match.params.slug);
  }

  render() {
    if (this.props.loading || this.props.post === false) {
      return <div />;
    }
    const time = getNormalizedDateString(this.props.post.publishAt);

    return (
      <div className={styles.post}>
        <h1 className={styles.title}>{this.props.post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.createdAt}>{time}</span>
        </div>
        <p
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: this.props.post.content }}
        />
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  match: PropTypes.object,
  loadPost: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost(),
  loading: selectPostLoading(),
  error: selectPostError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPost: slug => dispatch(loadPost(slug)),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
