import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectContent,
  selectAboutLoading,
  selectAboutError,
} from './selectors';
import { loadAbout } from './actions';
import Loader from 'components/Loader';

export class About extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  };

  static async getInitialProps(ctx) {
    const { store } = ctx;
    if (!selectContent()(store.getState())) {
      store.dispatch(loadAbout());
    }
    return {};
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn siden.</div>;
    } else if (this.props.content) {
      return <div dangerouslySetInnerHTML={{ __html: this.props.content }} />;
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  content: selectContent(),
  loading: selectAboutLoading(),
  error: selectAboutError(),
});

export default connect(mapStateToProps)(About);
