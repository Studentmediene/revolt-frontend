import Router from 'next/router';

export const initDevTools = () => {
  if (process.env.NODE_ENV !== 'production') {
    forceCSSRefresh();
  }
};

/**
 * Common bug in NextJS is that when in development mode, the CSS of the pages
 * does not update when navigating. By changing the URL for the CSS on every
 * route change, we force update the CSS in development mode.
 */
const forceCSSRefresh = () => {
  console.debug('Development: Enabled CSS refreshing');
  Router.events.on('routeChangeComplete', () => {
    if (process.env.NODE_ENV !== 'production') {
      const els = document.querySelectorAll(
        'link[href*="/_next/static/css/styles.chunk.css"]',
      );
      const timestamp = new Date().valueOf();
      els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
    }
  });
};
