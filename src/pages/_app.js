import React from 'react';
import App from 'next/app';
import moment from 'moment';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import styles from './styles.scss';
import './sanitize.scss';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
// import Player from 'components/Player';

import configureStore from '../store';

// Set global locales for moment
moment.locale('NB_no', {
  calendar: {
    lastDay: '[I går] HH:mm',
    sameDay: '[I dag] HH:mm',
    nextDay: '[I morgen] HH:mm',
    sameElse: 'DD.MM.YY HH:mm',
  },
  weekdaysShort: 'man_tirs_ons_tors_fre_lør_søn'.split('_'),
  weekdays: 'mandag_tirsdag_onsdag_torsdag_fredag_lørdag_søndag'.split('_'),
});

import { initializeErrorReporting } from 'utils/errorReporting';

if (process.env.NODE_ENV === 'production') {
  initializeErrorReporting();

  ReactGA.initialize('UA-4404225-6', {
    gaOptions: {
      anonymizeIp: true,
    },
  });
  //ReactGA.pageview(window.location.pathname + window.location.search);
}

class RadioRevolt extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let footerProps = await Footer.getInitialProps(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, footerProps, pathname: ctx.pathname };
  }

  render() {
    const { Component, pageProps, footerProps, store, pathname } = this.props;
    const plain = pathname.includes('/plainpost/'); // TODO: fix to render plain pages on apps

    if (plain) {
      return (
        <Provider store={store}>
          <div className={styles.container}>
            <main className={styles.content}>
              <Component {...pageProps} />
            </main>
          </div>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <div className={styles.container}>
          <Header />
          <main className={styles.content}>
            <Component {...pageProps} />
          </main>
          <Sidebar />
          <Footer {...footerProps} />
          {/* <Player />*/}
        </div>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(RadioRevolt));
