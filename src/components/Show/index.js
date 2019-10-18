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
import { loadShow } from './actions';
import Loader from 'components/Loader';
import Episode from 'components/Episode';
import PostPreview from 'components/PostPreview';
import ShowHeader from 'components/Show/ShowHeader';

export class Show extends React.Component {
  static async getInitialProps(ctx) {
    const { store, query } = ctx;
    if (!selectShow()(store.getState())) {
      const { slug } = query;
      store.dispatch(loadShow(slug));
    }

    return {};
  }

  render() {
    if (
      this.props.show === false ||
      this.props.show === null ||
      this.props.loading
    ) {
      return <Loader />;
    }

    const show = fromJS(this.props.show).toJS();

    const episodes = fromJS(this.props.episodes)
      .toJS()
      .map(e => ({
        ...e,
        date: e.publishAt,
        episode: true,
      }));

    const posts = fromJS(this.props.posts)
      .toJS()
      .map(p => ({
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
