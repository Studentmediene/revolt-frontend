/*
 *
 * Shows
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { selectShows, selectShowsLoading, selectShowsError } from './selectors';
import styles from './styles.css';
import { loadShows } from './actions';

import ShowPreviewList from 'components/ShowPreviewList';

export class Shows extends React.Component {
  state = {
    hideArchivedShows: true,
  };

  componentWillMount() {
    this.props.loadShow();
    this.toggleArchivedShows = this.toggleArchivedShows.bind(this);
  }

  toggleArchivedShows(event) {
    event.preventDefault();
    this.setState(prevState => ({
      hideArchivedShows: !prevState.hideArchivedShows,
    }));
  }

  render() {
    let showPreviewList = null;

    if (this.props.shows !== false) {
      showPreviewList = (
        <ShowPreviewList
          shows={this.props.shows}
          hideArchivedShows={this.state.hideArchivedShows}
          toggleArchivedShows={this.toggleArchivedShows}
        />
      );
    }

    return <div className={styles.shows}>{showPreviewList}</div>;
  }
}

Shows.propTypes = {
  loadShow: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  shows: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
};

Shows.defaultProps = {
  loading: false,
  error: false,
  shows: [],
};

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadShow: () => dispatch(loadShows()),
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shows));
