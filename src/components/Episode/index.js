import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import { togglePlayPause } from 'components/Player/actions';
import PlayPauseButton from 'components/Player/components/PlayPauseButton';
import { selectEpisodeId, selectPaused } from 'components/Player/selectors';

export class Episode extends React.Component {
  
  constructor(props) {
    super(props);
  }

  static propTypes = {
    digasBroadcastId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    lead: PropTypes.string,
    playOnDemand: PropTypes.func,
    togglePlayPause: PropTypes.func.isRequired,
    playingEpisodeId: PropTypes.number,
    publishAt: PropTypes.string.isRequired,
    paused: PropTypes.bool.isRequired,
    cropOverflow: PropTypes.bool,
  };

  render() {
    if (this.props.digasBroadcastId === 0) {
      return null;
    }

    const publishedAt = moment(this.props.publishAt);

    let isCurrentlyPlaying = false;

    if (this.props.playingEpisodeId === this.props.id && !this.props.paused) {
      isCurrentlyPlaying = true;
    }

    const playOnDemand = event => {
      event.preventDefault();
      if (this.props.playingEpisodeId === this.props.id) {
        this.props.togglePlayPause();
      } else {
        this.props.playOnDemand(this.props.id);
      }
    };

    return (
      <div
        className={styles.episode}
        onClick={playOnDemand}
        onKeyPress={playOnDemand}
      >
        <div className={styles.playbuttonbox}>
          <PlayPauseButton paused={!isCurrentlyPlaying}/>
        </div>
        <div className={styles.meta}>
          <div
            className={classNames(styles.title, {
              [styles.cropOverflow]: this.props.cropOverflow,
            })}
          >
            {this.props.title}
          </div>
          <div
            className={classNames(styles.lead, {
              [styles.cropOverflow]: this.props.cropOverflow,
            })}
            dangerouslySetInnerHTML={{ __html: this.props.lead }}
          />
          <div className={classNames(styles.publishedAt)}>
            Publisert: {publishedAt.format('DD.MM.YYYY')}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  playingEpisodeId: selectEpisodeId(),
  paused: selectPaused(),
});

function mapDispatchToProps(dispatch) {
  return {
    togglePlayPause: () => dispatch(togglePlayPause()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Episode);
