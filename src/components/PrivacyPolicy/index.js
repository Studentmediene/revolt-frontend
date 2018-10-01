import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader';
import { loadPrivacyPolicy } from './actions';
import {
  selectPrivacyPolicy,
  selectPrivacyPolicyLoading,
  selectPrivacyPolicyError,
} from './selectors';

export class PrivacyPolicy extends React.Component {
  static propTypes = {
    privacyPolicy: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loadPrivacyPolicy: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadPrivacyPolicy();
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.error) {
      return <div>Kunne ikke laste inn siden.</div>;
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.props.privacyPolicy }} />
      );
    }
  }
}

const mapStateToProps = createStructuredSelector({
  privacyPolicy: selectPrivacyPolicy(),
  loading: selectPrivacyPolicyLoading(),
  error: selectPrivacyPolicyError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPrivacyPolicy: () => dispatch(loadPrivacyPolicy()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
