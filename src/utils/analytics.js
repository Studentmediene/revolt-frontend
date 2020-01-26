import ReactGA from 'react-ga';

export const initTracking = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.G_ANALYTICS, {
      gaOptions: {
        anonymizeIp: true,
      },
      debug: true,
    });
  } else {
    console.debug('Development: Disabled analytics because of dev mode');
  }
};

export const trackPage = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

export const trackEvent = (category, action) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
    });
  }
};
