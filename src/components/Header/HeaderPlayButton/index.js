import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles.css';
import { playLive } from 'components/Player/actions';

export class HeaderPlayButton extends React.Component {
  static propTypes = {
    playLive: React.PropTypes.func.isRequired,
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
          <div className={styles.buttonText}>Lytt direkte!</div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    playLive: (offset = 0) => dispatch(playLive(offset)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPlayButton);
