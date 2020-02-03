import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import styles from './styles.scss';
import './sanitize.scss';

import ErrorComponent from './_error';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import Player from 'components/Player';

import Meta from 'components/Meta';
import configureStore from '../store';
import { getUrlInfo } from 'utils/headUtils';
import { initMoment } from 'utils/dateUtils';
import { initDevTools } from 'utils/devTools';
import { initTracking, trackPage } from 'utils/analytics';
import { initErrorReporting } from 'utils/errorReporting';
import { SITE_DESCRIPTION } from 'utils/constants';

initMoment();
initErrorReporting();
initDevTools();

class RadioRevolt extends App {
  static async getInitialProps({ Component, ctx }) {
    const { req, isServer } = ctx;
    let pageProps = {};
    let footerProps = {};

    if (Component !== ErrorComponent) {
      footerProps = await Footer.getInitialProps(ctx);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const { host } = getUrlInfo(req, isServer);
    const url = host + ctx.pathname;

    return { pageProps, footerProps, pathname: ctx.pathname, host, url };
  }

  componentDidMount() {
    initTracking();
    trackPage();
  }

  componentDidUpdate() {
    trackPage();
  }

  render() {
    const {
      Component,
      pageProps,
      footerProps,
      store,
      pathname,
      host,
      url,
    } = this.props;
    const plain = pathname.includes('/plainpost/');

    const meta = (
      <Meta
        browserTitle={'Radio Revolt'}
        pageTitle={'Radio Revolt'}
        type="website"
        url={url}
        description={SITE_DESCRIPTION}
        image={host + '/assets/RR_logo.png'}
      />
    );

    return (
      <Provider store={store}>
        <div className={styles.container}>
          {meta}
          {plain ? null : <Header />}
          <main className={styles.content}>
            <Component {...pageProps} />
          </main>
          {plain ? null : <Sidebar />}
          {plain ? null : <Footer {...footerProps} />}
          {plain ? null : <Player />}
        </div>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(RadioRevolt));
