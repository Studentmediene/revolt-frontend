import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';

import styles from './styles.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';
// import Player from 'components/Player';
import Sidebar from 'components/Sidebar';

import configureStore from '../store';

const initialState = {};
const store = configureStore(initialState);

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const plain = false;
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <div className={styles.container}>
          {!plain && <Header />}
          <main className={styles.content}>
            <Component {...pageProps} />
          </main>
          {!plain && <Sidebar />}
          {/*!plain && <Footer />*/}
          {/* !plain && <Player />*/}
        </div>
      </Provider>
    );
  }
}

export default MyApp;
