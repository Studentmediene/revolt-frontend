import React from 'react';
import ReactGA from 'react-ga';

import FrontPage from '../components/FrontPage';
import { initializeErrorReporting } from '../utils/errorReporting';

if (process.env.NODE_ENV === 'production') {
  initializeErrorReporting();

  ReactGA.initialize('UA-4404225-6', {
    gaOptions: {
      anonymizeIp: true,
    },
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export default () => <FrontPage />;
