/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import styles from './styles.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Player from 'components/Player';
import Sidebar from 'components/Sidebar';
import { selectPathname } from 'utils/router/selectors';

export class App extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
  };
  render() {
    const plain = this.props.pathname.startsWith('/plainpost');
    return (
      <div className={styles.container}>
        {!plain && <Header />}
        <main className={styles.content}>
          <Switch>{this.props.routes}</Switch>
        </main>
        {!plain && <Sidebar />}
        {!plain && <Footer />}
        {!plain && <Player />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pathname: selectPathname(),
});

export default connect(mapStateToProps)(App);
