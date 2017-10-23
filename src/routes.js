import { getAsyncInjectors } from 'utils/asyncInjectors';
import asyncComponent from 'utils/asyncComponent';

const errorLoading = err => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'frontPage',
      exact: true,
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/FrontPage/reducer'),
          System.import('components/FrontPage/sagas'),
          System.import('components/FrontPage'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('frontPage', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/om',
      name: 'about',
      exact: true,
      component: asyncComponent(() =>
        System.import('components/About').catch(errorLoading),
      ),
    },

    {
      path: '/programmer',
      name: 'shows',
      exact: true,
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Shows/reducer'),
          System.import('components/Shows/sagas'),
          System.import('components/Shows'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('shows', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Post/reducer'),
          System.import('components/Post/sagas'),
          System.import('components/Post'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('post', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/programmer/:slug',
      name: 'show',
      component: asyncComponent(() =>
        Promise.all([
          System.import('components/Show/reducer'),
          System.import('components/Show/sagas'),
          System.import('components/Show'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('show', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '*',
      name: 'notfound',
      component: asyncComponent(() =>
        System.import('components/NotFoundPage').catch(errorLoading),
      ),
    },
  ];
}
