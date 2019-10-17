import React from 'react';
import App from 'next/app';
import moment from 'moment';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import styles from './styles.scss';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
// import Player from 'components/Player';

import configureStore from '../store';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// Set global locales for moment
moment.locale('NB_no', {
  calendar: {
    lastDay: '[I går] HH:mm',
    sameDay: '[I dag] HH:mm',
    nextDay: '[I morgen] HH:mm',
    sameElse: 'DD.MM.YY HH:mm'
  },
  weekdaysShort: 'man_tirs_ons_tors_fre_lør_søn'.split('_'),
  weekdays: 'mandag_tirsdag_onsdag_torsdag_fredag_lørdag_søndag'.split('_')
});

class RadioRevolt extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let footerProps = await Footer.getInitialProps(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, footerProps };
  }

  render() {
    const plain = false; // TODO: fix to render plain pages on apps

    const { Component, pageProps, footerProps, store } = this.props;
    return (
      <Provider store={store}>
        <div className={styles.container}>
          {!plain && <Header />}
          <main className={styles.content}>
            <Component {...pageProps} />
          </main>
          {!plain && <Sidebar />}
          {!plain && <Footer {...footerProps} />}
          {/* !plain && <Player />*/}
        </div>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(RadioRevolt));
