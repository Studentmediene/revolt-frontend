/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import styles from './styles.scss';
import classNames from 'classnames';
import Episode from 'components/Episode';
import { getOnDemandPlaylist } from 'components/Player/actions';
import { createStructuredSelector } from 'reselect';
import { selectNewestEpisodes } from '../../selectors.js';
import { selectPaused, selectEpisodeId } from 'components/Player/selectors';

class HighlightedShows extends Component {
  constructor(props) {
    super(props);
    // test state
    this.state = {
      selectedShowIndex: 0,
      playingEpisodeIndex: -1,
      selected: false,
    };
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (!this.state.selected) {
        if (this.props.paused || this.state.playingEpisodeIndex === -1) { //&& this.state.playingEpisodeIndex === -1
          this.setState({
            selectedShowIndex:
              this.state.selectedShowIndex === this.props.shows.toJS().length - 1
                ? 0
                : this.state.selectedShowIndex + 1,
          });
        } else {
          if (
            this.props.shows.toJS()[this.state.playingEpisodeIndex].id !=
            this.props.currentlyPlayingId
          ) {
            // eslint-disable-next-line no-console
            //console.log('reset');
            this.setState({
              playingEpisodeIndex: -1,
            });
          } else {
            this.setState({
              selectedShowIndex: this.state.playingEpisodeIndex,
            });
          }
        }
      }
      /* // eslint-disable-next-line no-console
      console.log(
        'selectedShowIndex: ' +
          this.state.selectedShowIndex +
          ' playingEpisodeIndex: ' +
          this.state.playingEpisodeIndex +
          ' selected: ' +
          this.state.selected +
          ' paused: ' +
          this.props.paused,
      ); */
    }, 1000000);
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  mapShows() {
    return this.props.shows.toJS().map((show, index) => (
      <div
        className={classNames(styles.showImage, {
          [styles.selected]: index === this.state.selectedShowIndex,
          [styles.unselected]: index != this.state.selectedShowIndex,
        })}
        key={index}
        onMouseEnter={() => {
          clearInterval(this.interval);
          this.setState({ selectedShowIndex: index, selected: true });
        }}
        onMouseLeave={() => {
          this.setState({ selected: false });
          this.startInterval();
        }}
      >
        <img
          className={styles.img}
          src={show.imgURL}
          alt={show.name}
          width="100%"
        />
      </div>
    ));
  }

  render() {
    const show = this.props.shows.toJS()[this.state.selectedShowIndex];
    return (
      <div className={styles.container}>
        <div className={styles.title}>De nyeste episodene</div>
        <div className={styles.showsContainer}>{this.mapShows()}</div>
        <div className={styles.playerContainer}>
          <div
            className={styles.player}
            onClick={() => {
              this.setState({
                playingEpisodeIndex: this.state.selectedShowIndex,
                selected: false,
              });
            }}
          >
            <Episode
              title={show.title}
              publishAt={show.publishAt}
              id={show.id}
              key={show.id}
              playOnDemand={this.props.playOnDemand}
              cropOverflow={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

HighlightedShows.propTypes = {
  shows: PropTypes.instanceOf(Immutable.List),
  playOnDemand: PropTypes.func,
  paused: PropTypes.bool.isRequired,
  currentlyPlayingId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  shows: selectNewestEpisodes(),
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
)(HighlightedShows);
