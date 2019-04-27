import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { loadShows } from './actions';
import Loader from 'components/Loader';
import ShowPreviewList from './ShowPreviewList';
import { selectShows, selectShowsLoading, selectShowsError } from './selectors';
import styles from './styles.scss';
import classNames from 'classnames';

export class Shows extends React.Component {
  state = {
    showArchivedShows: false,
  };

  componentWillMount() {
    this.props.loadShow();
    this.toggleArchivedShows = this.toggleArchivedShows.bind(this);
  }

  toggleArchivedShows(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showArchivedShows: !prevState.showArchivedShows,
    }));
  }

  render() {
    let showPreviewList = null;

    if (this.props.shows !== false) {
      showPreviewList = (
        <ShowPreviewList
          shows={this.props.shows}
          showArchivedShows={this.state.showArchivedShows}
          toggleArchivedShows={this.toggleArchivedShows}
        />
      );
    } else {
      return <Loader />;
    }

    return (
      <div>
        <div className={styles.buttonWrapper}>
          <button className={classNames(styles.kultur, styles.button)}>
            Kultur
          </button>
          <button className={classNames(styles.morgen, styles.button)}>
            Morgen
          </button>
          <button className={classNames(styles.musikk, styles.button)}>
            Musikk
          </button>
          <button className={classNames(styles.underholdning, styles.button)}>
            Underholdning
          </button>
        </div>
        <React.Fragment>{showPreviewList}</React.Fragment>
      </div>
    );
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
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shows));
