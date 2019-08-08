import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLocation } from 'utils/router/selectors';

export class ScrollToTop extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = createStructuredSelector({
  location: selectLocation(),
});

export default connect(mapStateToProps)(ScrollToTop);

