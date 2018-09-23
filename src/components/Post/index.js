import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { getNormalizedDateString } from 'utils/dateUtils';
import { selectPost, selectPostLoading, selectPostError } from './selectors';
import { getOnDemandPlaylist } from 'components/Player/actions';
import { loadPost } from './actions';
import Episode from 'components/Episode';

import './editor.css';
import styles from './styles.css';

export class Post extends React.Component {
  componentWillMount() {
    this.props.loadPost(this.props.match.params.slug);
  }

  render() {
    if (this.props.loading || this.props.post === false) {
      return <div />;
    }
    const { episodes } = this.props.post;
    const time = getNormalizedDateString(this.props.post.publishAt);

    let categories;
    if (this.props.post.categories && this.props.post.categories.length > 0) {
      categories = this.props.post.categories.map((category, index) => {
        if (index === this.props.post.categories.length - 1) {
          return <span key={category.name}>{category.name}</span>;
        } else {
          return <span key={category.name}>{category.name}, </span>;
        }
      });
      categories = (
        <div>
          <span>Kategorier: </span>
          {categories}
        </div>
      );
    }

    return (
      <div className={styles.post}>
        <h1 className={styles.title}>{this.props.post.title}</h1>
        <div className={styles.meta}>
          {categories}
          <div className={styles.createdAt}>{time}</div>
        </div>
        <p
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: this.props.post.content }}
        />
        {episodes &&
          episodes.map(element => (
            <Episode
              {...element}
              key={element.id}
              playOnDemand={this.props.playOnDemand}
            />
          ))}
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
  playOnDemand: PropTypes.func,
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
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
