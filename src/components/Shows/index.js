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
    filteredShows: false,
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

  filterCategory(a) {
    let list = [];
    for (let i of this.props.shows) {
      if (
        i.categories &&
        i.categories.length > 0 &&
        a == i.categories[0].name
      ) {
        list.push(i);
      }
    }
    console.log('hei');
    console.log(list);
    this.setState({
      filteredShows: list,
    });
  }

  render() {
    // const hei = this.filterCategory();

    let showPreviewList = null;
    let showsToDisplay = this.state.filteredShows;

    if (!showsToDisplay) {
      showsToDisplay = this.props.shows;
    }

    if (this.props.shows !== false) {
      showPreviewList = (
        <ShowPreviewList
          shows={showsToDisplay}
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
          <button
            onClick={() => this.filterCategory('Kultur')}
            className={classNames(styles.kultur, styles.button)}
          >
            Kultur
          </button>
          <button
            onClick={() => this.filterCategory('Morgen')}
            className={classNames(styles.morgen, styles.button)}
          >
            Morgen
          </button>
          <button
            onClick={() => this.filterCategory('Musikk')}
            className={classNames(styles.musikk, styles.button)}
          >
            Musikk
          </button>
          <button
            onClick={() => this.filterCategory('Underholdning')}
            className={classNames(styles.underholdning, styles.button)}
          >
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
