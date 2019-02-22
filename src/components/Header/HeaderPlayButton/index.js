import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';
import { togglePlayPause } from 'components/Player/actions';
import PlayPauseButton from 'components/Player/components/PlayPauseButton';
import { selectLiveTitle, selectPaused } from 'components/Player/selectors';

export class HeaderPlayButton extends React.Component {
  static propTypes = {
    togglePlayPause: PropTypes.func.isRequired,
    nowPlaying: PropTypes.string,
    paused: PropTypes.bool,
  };

  render() {
    return (
      <div className={styles.container} onClick={this.props.togglePlayPause}>
        <PlayPauseButton
          paused={this.props.paused}
        />
        <div className={styles.buttonText}>
          <div className={styles.largeText}>Lytt direkte!</div>
          <div className={styles.smallText}>{this.props.nowPlaying}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nowPlaying: selectLiveTitle(),
  paused: selectPaused(),
});

function mapDispatchToProps(dispatch) {
  return {
    togglePlayPause: () => dispatch(togglePlayPause()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPlayButton);
