/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';

import styles from './styles.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Player from 'components/Player';

export class App extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };
  render() {
    const plain = this.props.location.pathname.startsWith('/plainpost');
    return (
      <div className={styles.container}>
        {!plain && <Header />}
        <div className={styles.content}>
          <Switch>{this.props.routes}</Switch>
        </div>
        {!plain && <Footer />}
        {!plain && <Player />}
      </div>
    );
  }
}

export default withRouter(App);
