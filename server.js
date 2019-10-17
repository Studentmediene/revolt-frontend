const express = require('express');
const logger = require('./server/logger');
const next = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const ngrok = isDev && process.env.ENABLE_TUNNEL ? require('ngrok') : false;

/* eslint-disable no-console */

const devProxy = {
  '/graphql': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
  '/media': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const proxyMiddleware = require('http-proxy-middleware');
      Object.keys(devProxy).forEach(function(context) {
        server.use(proxyMiddleware(context, devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      if (err) {
        return logger.error(err.message);
      }

      // Connect to ngrok in dev mode
      if (ngrok) {
        ngrok.connect(port, (innerErr, url) => {
          if (innerErr) {
            return logger.error(innerErr);
          }

          logger.appStarted(port, url);
        });
      } else {
        logger.appStarted(port);
      }
    });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
