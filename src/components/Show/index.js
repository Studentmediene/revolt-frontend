import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  componentWillMount() {
    this.props.loadShow(this.props.match.params.slug);
  }

  render() {
    if (
      this.props.show === false ||
      this.props.show === null ||
      this.props.loading
    ) {
      return <Loader />;
    }

    const episodes = this.props.episodes.map(e => ({
      ...e,
      date: e.publishAt,
      episode: true,
    }));

    const posts = this.props.posts.map(p => ({
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
            showName={this.props.show.title}
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
        <ShowHeader show={this.props.show} />
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
    loadShow: slug => dispatch(loadShow(slug)),
    playPodcast: (episodeId, offset = 0) =>
      dispatch(getPodcastPlaylist(episodeId, offset)),
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Show));
