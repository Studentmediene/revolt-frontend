import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import { togglePlayPause, playLive } from 'components/Player/actions';
import PlayPauseButton from 'components/Player/components/PlayPauseButton';
import { selectLiveTitle, selectPaused, selectLive } from 'components/Player/selectors';

export class HeaderPlayButton extends React.Component {
  static propTypes = {
    togglePlayPause: PropTypes.func.isRequired,
    nowPlaying: PropTypes.string,
    paused: PropTypes.bool,
  };

  render() {

    let isCurrentlyLive = false;

    if (!this.props.paused && this.props.isLive) {
      isCurrentlyLive = true;
    }

    const buttonClicked = event => {
      event.preventDefault();
      if (this.props.isLive) {
        this.props.togglePlayPause();
      } else {
        this.props.playLive();
      }
    }

    return (
      <button className={styles.container} onClick={buttonClicked}>
        <PlayPauseButton
          paused={!isCurrentlyLive}
        />
        <div className={styles.buttonText}>
          <div className={styles.largeText}>Lytt direkte!</div>
          <div className={styles.smallText}>{this.props.nowPlaying}</div>
        </div>
      </button>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nowPlaying: selectLiveTitle(),
  paused: selectPaused(),
  isLive: selectLive(),
});

function mapDispatchToProps(dispatch) {
  return {
    togglePlayPause: () => dispatch(togglePlayPause()),
    playLive: () => dispatch(playLive()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPlayButton);
