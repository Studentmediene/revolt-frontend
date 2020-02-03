import Raven from 'raven-js';

export const initErrorReporting = () => {
  if (process.env.NODE_ENV === 'production') {
    Raven.config(process.env.SENTRY_URL).install();
  } else {
    console.debug('Development: Disabled error reporting because of dev mode');
  }
};
