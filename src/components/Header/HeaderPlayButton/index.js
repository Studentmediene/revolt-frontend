import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.css';
import { selectLiveTitle } from './selectors';
import { playLive } from 'components/Player/actions';

export class HeaderPlayButton extends React.Component {
  static propTypes = {
    playLive: PropTypes.func.isRequired,
    nowPlaying: PropTypes.string,
  };

  render() {
    return (
      <div className={styles.container}>
        <button
          className={styles.playButton}
          onClick={() => this.props.playLive()}
          onKeyPress={() => this.props.playLive()}
        >
          <div className={styles.playIcon}>
            <div className={styles.playIconInner} />
          </div>
          <div className={styles.buttonText}>
            <div className={styles.largeText}>Lytt direkte!</div>
            <div className={styles.smallText}>{this.props.nowPlaying}</div>
          </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nowPlaying: selectLiveTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    playLive: (offset = 0) => dispatch(playLive(offset)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPlayButton);
