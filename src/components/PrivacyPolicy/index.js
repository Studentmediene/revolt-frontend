import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectContent,
  selectPrivacyPolicyLoading,
  selectPrivacyPolicyError,
} from './selectors';
import Loader from 'components/Loader';
import { loadPrivacyPolicy } from './actions';

export class PrivacyPolicy extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  };

  static async getInitialProps(ctx) {
    const { store } = ctx;
    if (!selectContent()(store.getState())) {
      store.dispatch(loadPrivacyPolicy());
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
  loading: selectPrivacyPolicyLoading(),
  error: selectPrivacyPolicyError(),
});

export default connect(mapStateToProps)(PrivacyPolicy);
