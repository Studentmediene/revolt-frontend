import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import Expander from './components/Expander';

import styles from './styles.scss';
import { togglePlayPause } from 'components/Player/actions';
import PlayPauseButton from 'components/Player/components/PlayPauseButton';
import { selectEpisodeId, selectPaused } from 'components/Player/selectors';

export class Episode extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
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
    toggleExpanded: PropTypes.func,
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

    const isExpanded = this.state.expanded 
      ? {display: 'block'}
      : {display: 'none'};

    const playOnDemand = event => {
      event.preventDefault();
      if (this.props.playingEpisodeId === this.props.id) {
        this.props.togglePlayPause();
      } else {
        this.props.playOnDemand(this.props.id);
      }
    };

    const toggleExpanded = event => {
      event.preventDefault();
      event.stopPropagation()
      this.setState({
          expanded: !this.state.expanded
        }
      )
    }

    return (
      <div
        className={styles.episode}
        onClick={playOnDemand}
        onKeyPress={playOnDemand}
      >
        <PlayPauseButton paused={!isCurrentlyPlaying} />
        <div className={styles.meta}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.expandable} style={isExpanded}
            dangerouslySetInnerHTML={{ __html: this.props.lead }}
          />
          <div className={classNames(styles.publishedAt)}>
            Publisert: {publishedAt.format('DD.MM.YYYY')}
          </div>
        </div>
        <Expander expanded={this.state.expanded} expandFunction={toggleExpanded}/>
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
