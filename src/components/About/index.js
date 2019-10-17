import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadAbout } from './actions';
import Loader from 'components/Loader';
import { selectAbout, selectAboutLoading, selectAboutError } from './selectors';

export class About extends React.Component {
  static propTypes = {
    about: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadAbout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadAbout();
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn siden.</div>;
    } else {
      return <div dangerouslySetInnerHTML={{ __html: this.props.about }} />;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  about: selectAbout(),
  loading: selectAboutLoading(),
  error: selectAboutError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadAbout: () => dispatch(loadAbout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
