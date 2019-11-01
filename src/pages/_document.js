import React from 'react';
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="nb">
        <Head>
          <meta charSet="utf-8" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="mobile-web-app-capable" content="yes" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />

          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-32x32.png"
            sizes="32x32"
          />

          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-16x16.png"
            sizes="16x16"
          />

          <link rel="manifest" href="/favicons/manifest.json" />

          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#ecb61c"
          />

          <link rel="shortcut icon" href="/favicons/favicon.ico" />

          <meta name="msapplication-TileColor" content="#ecb61c" />

          <meta
            name="msapplication-TileImage"
            content="/favicons/mstile-150x150.png"
          />

          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />

          <meta name="theme-color" content="#ecb61c" />

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
