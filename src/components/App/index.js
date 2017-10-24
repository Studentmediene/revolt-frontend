/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, withRouter } from 'react-router-dom';

import styles from './styles.css';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Player from 'components/Player';

import { playLive } from 'components/Player/actions';

class App extends React.Component {
  static propTypes = {
    routes: React.PropTypes.array.isRequired,
  };
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Switch>{this.props.routes}</Switch>
        </div>
        <Footer />
        <Player />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    playLive: (offset = 0) => dispatch(playLive(offset)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
