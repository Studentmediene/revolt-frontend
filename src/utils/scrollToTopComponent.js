import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export class ScrollToTop extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
