import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadShows } from './actions';
import Loader from 'components/Loader';
import ShowPreviewList from './ShowPreviewList';
import { selectShows, selectShowsLoading, selectShowsError } from './selectors';

export class Shows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchivedShows: false,
    };
    this.toggleArchivedShows = this.toggleArchivedShows.bind(this);
  }

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    shows: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.bool,
    ]),
  };

  static async getInitialProps(ctx) {
    const { store } = ctx;
    if (!selectShows()(store.getState())) {
      store.dispatch(loadShows());
    }
    return {};
  }

  toggleArchivedShows(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showArchivedShows: !prevState.showArchivedShows,
    }));
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn programmene.</div>;
    } else {
      let showPreviewList = null;

      const shows = fromJS(this.props.shows);

      if (!shows.isEmpty()) {
        showPreviewList = (
          <ShowPreviewList
            shows={shows}
            showArchivedShows={this.state.showArchivedShows}
            toggleArchivedShows={this.toggleArchivedShows}
          />
        );
      }
      return <React.Fragment>{showPreviewList}</React.Fragment>;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  shows: selectShows(),
  loading: selectShowsLoading(),
  error: selectShowsError(),
});

export default connect(mapStateToProps)(Shows);
