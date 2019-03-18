import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import { togglePlayPause } from 'components/Player/actions';
import PlayPauseButton from 'components/Player/components/PlayPauseButton';
import { selectEpisodeId, selectPaused } from 'components/Player/selectors';

export class Episode extends React.Component {
  static propTypes = {
    digasBroadcastId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    lead: PropTypes.string,
    playOnDemand: PropTypes.func,
  }

  render() {
    if (this.props.digasBroadcastId === 0) {
      return null;
    }

    let isCurrentlyPlaying = false;
  
    if (this.props.playingEpisodeId === this.props.id && !this.props.paused) {
      isCurrentlyPlaying = true;
    }

    const playOnDemand = event => {
      event.preventDefault();
      if(this.props.playingEpisodeId === this.props.id) {
        this.props.togglePlayPause()
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
        <PlayPauseButton
          paused={!isCurrentlyPlaying}
        />
        <div className={styles.meta}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.lead} dangerouslySetInnerHTML={{ __html: this.props.lead }} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  playingEpisodeId: selectEpisodeId(),
  paused: selectPaused(),
});

function mapDispatchToProps(dispatch) {
  return {
    togglePlayPause: () => dispatch(togglePlayPause()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Episode);

