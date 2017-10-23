/*
 *
 * Show
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  selectShow,
  selectShowEpisodes,
  selectShowPosts,
  selectShowLoading,
  selectShowError,
} from './selectors';
import { loadShow } from './actions';
import {
  getPodcastPlaylist,
  getOnDemandPlaylist,
} from 'components/Player/actions';
import styles from './styles.css';
import Episode from 'components/Episode';
import PostPreview from 'components/PostPreview';
import ShowDetailHeader from 'components/ShowDetailHeader';

export class Show extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadShow(this.props.match.params.slug);
  }

  render() {
    if (
      this.props.show === false ||
      this.props.show === null ||
      this.props.loading
    ) {
      return <div />;
    }
    const episodes = this.props.episodes.map(e => ({
      ...e,
      date: e.createdAt,
      episode: true,
    }));

    const posts = this.props.posts.map(p => ({
      ...p,
      date: p.createdAt,
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
        <div className={styles.post} key={index}>
          <PostPreview {...element} />
        </div>
      );
    });

    return (
      <div>
        <ShowDetailHeader show={this.props.show} />
        <div className={styles.content}>{elements}</div>
      </div>
    );
  }
}

Show.propTypes = {
  show: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  episodes: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  posts: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  match: React.PropTypes.object,
  loadShow: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  playPodcast: React.PropTypes.func,
  playOnDemand: React.PropTypes.func,
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
