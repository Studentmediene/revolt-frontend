import Raven from 'raven-js';

const sentryUrl = 'https://4a51e06b6acd449a82bb681eb2c2ceb2@sentry.io/212549';

export function initializeErrorReporting() {
  Raven.config(sentryUrl).install();
}
