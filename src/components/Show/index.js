import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';

import {
  selectShow,
  selectShowEpisodes,
  selectShowPosts,
  selectShowLoading,
  selectShowError,
} from './selectors';
import {
  getPodcastPlaylist,
  getOnDemandPlaylist,
} from 'components/Player/actions';
import Meta from './meta';
import { loadShow } from './actions';
import Loader from 'components/Loader';
import Episode from 'components/Episode';
import { getUrlInfo } from 'utils/headUtils';
import PostPreview from 'components/PostPreview';
import ShowHeader from 'components/Show/ShowHeader';

export class Show extends React.Component {
  static async getInitialProps({ store, query: { slug }, isServer, req }) {
    if (!selectShow()(store.getState()).get(slug)) {
      store.dispatch(loadShow(slug));
    }
    const { host, url } = getUrlInfo(req, isServer);

    return { slug, host, url };
  }

  render() {
    if (
      this.props.show === false ||
      this.props.show === null ||
      this.props.loading
    ) {
      return <Loader />;
    }

    const show = fromJS(this.props.show).toJS()[this.props.slug];

    const episodes = show.episodes.map(e => ({
      ...e,
      date: e.publishAt,
      episode: true,
    }));

    const posts = show.posts.map(p => ({
      ...p,
      date: p.publishAt,
      episode: false,
    }));

    const elementList = posts.concat(episodes).sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);
      if (dateA.isBefore(dateB)) return 1;
      if (dateB.isBefore(dateA)) return -1;
      return 0;
    });

    const elements = elementList.map((element, index) => {
      if (element.episode) {
        return (
          <Episode
            {...element}
            showName={show.title}
            key={index}
            playOnDemand={this.props.playOnDemand}
          />
        );
      }
      return (
        <div key={index}>
          <PostPreview {...element} />
        </div>
      );
    });
    return (
      <div>
        <Meta show={show.show} host={this.props.host} url={this.props.url} />
        <ShowHeader show={show} />
        <div>{elements}</div>
      </div>
    );
  }
}

Show.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  episodes: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  posts: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  match: PropTypes.object,
  loadShow: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  playPodcast: PropTypes.func,
  playOnDemand: PropTypes.func,
  host: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  show: selectShow(),
  episodes: selectShowEpisodes(),
  posts: selectShowPosts(),
  loading: selectShowLoading(),
  error: selectShowError(),
});

function mapDispatchToProps(dispatch) {
  return {
    playPodcast: (episodeId, offset = 0) =>
      dispatch(getPodcastPlaylist(episodeId, offset)),
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Show));
