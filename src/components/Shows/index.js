import React from 'react';
import PropTypes from 'prop-types';
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
  loadShow: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  shows: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
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
