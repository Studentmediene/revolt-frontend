import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import styles from './styles.scss';
import classNames from 'classnames';
import EmbeddedEpisode from 'components/EmbeddedEpisode';
import { getOnDemandPlaylist } from 'components/Player/actions';
import { createStructuredSelector } from 'reselect';
import { selectNewestEpisodes } from '../../selectors.js';
import { selectPaused, selectEpisodeId } from 'components/Player/selectors';

class NewestEpisodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEpisodeIndex: 0, // the episode that is currently highlighted
      playingEpisodeIndex: -1, // the currently playing new episode or last played new episode if paused
      hover: false, // if the user is currently hovering over one of the new episodes
    };
    this.startInterval = this.startInterval.bind(this);
    this.mapEpisodes = this.mapEpisodes.bind(this);
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (!this.state.hover) {
        if (this.props.paused || this.state.playingEpisodeIndex === -1) {
          // cycle through normally
          this.setState({
            selectedEpisodeIndex:
              this.state.selectedEpisodeIndex ===
              this.props.episodes.toJS().length - 1
                ? 0
                : this.state.selectedEpisodeIndex + 1,
          });
        } else {
          // reset the playingEpisodeIndex if none of the newest episodes are playing
          if (this.props.episodes.toJS()[this.state.playingEpisodeIndex].id !=
              this.props.currentlyPlayingId
          ){
            this.setState({
              playingEpisodeIndex: -1,
            });
          } else {
            this.setState({
              selectedEpisodeIndex: this.state.playingEpisodeIndex,
            });
          }
        }
      }
    }, 5000); //interval speed
  }
  /* Part of render */
  mapEpisodes() {
    return this.props.episodes.toJS().map((episode, index) => (
      <div
        className={classNames(styles.showImage, {
          [styles.selected]: index === this.state.selectedEpisodeIndex,
          [styles.unselected]: index != this.state.selectedEpisodeIndex,
        })}
        key={index}
        onMouseEnter={() => {
          clearInterval(this.interval);
          this.setState({ selectedEpisodeIndex: index, hover: true });
        }}
        onMouseLeave={() => {
          this.setState({ hover: false });
          this.startInterval();
        }}
      >
        <img className={styles.img} src={episode.imgURL} alt={episode.name} />
      </div>
    ));
  }

  render() {
    const episode = this.props.episodes.toJS()[this.state.selectedEpisodeIndex];
    return (
      <div className={styles.container}>
        <div className={styles.title}>De nyeste episodene</div>
        <div className={styles.imagesContainer}>{this.mapEpisodes()}</div>
        <div className={styles.playerContainer}>
          <div
            className={styles.player}
            onClick={() => {
              this.setState({
                playingEpisodeIndex: this.state.selectedEpisodeIndex,
                hover: false,
              });
            }}
          >
            <EmbeddedEpisode
              title={episode.title}
              publishAt={episode.publishAt}
              id={episode.id}
              key={episode.id}
              playOnDemand={this.props.playOnDemand}
              cropOverflow={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

NewestEpisodes.propTypes = {
  episodes: PropTypes.instanceOf(Immutable.List),
  playOnDemand: PropTypes.func,
  paused: PropTypes.bool.isRequired, //nothing is playing globally
  currentlyPlayingId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  episodes: selectNewestEpisodes(),
  paused: selectPaused(),
  currentlyPlayingId: selectEpisodeId(),
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
)(NewestEpisodes);
