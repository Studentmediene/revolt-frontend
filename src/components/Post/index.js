import React from 'react';
import moment from 'moment';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import 'components/common/styles/editor.scss';

import Meta from './meta';
import { loadPost } from './actions';
import Loader from 'components/Loader';
import NewEpisode from 'components/NewEpisode';
import { getUrlInfo } from 'utils/headUtils';
import { getNormalizedDateString } from 'utils/dateUtils';
import { getOnDemandPlaylist } from 'components/Player/actions';
import { selectPost, selectPostLoading, selectPostError } from './selectors';

export class Post extends React.Component {
  static async getInitialProps({ store, query: { slug }, req, isServer }) {
    if (!selectPost()(store.getState()).get(slug)) {
      store.dispatch(loadPost(slug));
    }
    const { host, url } = getUrlInfo(req, isServer);

    return { slug, host, url };
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn artikkelen.</div>;
    }
    const post = fromJS(this.props.post).toJS()[this.props.slug];

    const { episodes } = post;
    const time = getNormalizedDateString(post.publishAt);
    const machineReadableTime = moment(post.publishAt).toISOString();

    let categories;
    if (post.categories && post.categories.length > 0) {
      categories = post.categories.map((category, index) => {
        if (index === post.categories.length - 1) {
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
      <article className={styles.post}>
        <Meta post={post} host={this.props.host} url={this.props.url} />
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          {categories}
          <time className={styles.createdAt} dateTime={machineReadableTime}>
            {time}
          </time>
        </div>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {episodes &&
          episodes.map(element => (
            <NewEpisode
              {...element}
              key={element.id}
              playOnDemand={this.props.playOnDemand}
            />
          ))}
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  match: PropTypes.object,
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
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Post));
