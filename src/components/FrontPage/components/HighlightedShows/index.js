import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';
import classNames from 'classnames';
import Episode from 'components/Episode';
import { getOnDemandPlaylist } from 'components/Player/actions';
import { createStructuredSelector } from 'reselect';
import { selectNewestEpisodes } from '../../selectors.js';


class HighlightedShows extends React.Component {
  constructor(props) {
    super(props);
    // test state
    this.state = {
      selectedShowIndex: 0,
    };
  }

  startInterval() {
      this.interval = setInterval(
        () =>
          this.setState({
            selectedShowIndex:
              this.state.selectedShowIndex === this.props.shows.length-1
                ? 0
                : this.state.selectedShowIndex + 1,
          }),
        4000,
      ); 
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  mapShows() {
    return this.props.shows.map((show, index) => (
      <div
        className={classNames(styles.showImage, {
          [styles.selected]: index === this.state.selectedShowIndex,
          [styles.unselected]: index != this.state.selectedShowIndex,
        })}
        key={index}
        onMouseEnter={() => {
          clearInterval(this.interval);
          this.setState({ selectedShowIndex: index});
        }}
        onMouseLeave={() => {
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
    const show = this.props.shows[this.state.selectedShowIndex];
    return (
      <div className={styles.container}>
        <div className={styles.title}>De nyeste episodene</div>
        <div className={styles.showsContainer}>{this.mapShows()}</div>
        <div className={styles.playerContainer}>
          <div className={styles.player} onClick={() => {
          clearInterval(this.interval);
        }}>
            <Episode
              title={show.title}
              publishAt={show.publishAt}
              id={show.id}
              key={show.id}
              playOnDemand={this.props.playOnDemand}
            />
          </div>
        </div>
      </div>
    );
  }
}

HighlightedShows.propTypes = {
  shows: PropTypes.array,
  playOnDemand: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  shows: selectNewestEpisodes(),
});

function mapDispatchToProps(dispatch) {
  return {
    playOnDemand: (episodeId, offset = 0) =>
      dispatch(getOnDemandPlaylist(episodeId, offset)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HighlightedShows));
