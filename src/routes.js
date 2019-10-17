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
      path: '/programmer',
      name: 'shows',
      exact: true,
      component: asyncComponent(() =>
        Promise.all([
          import('components/Shows/reducer'),
          import('components/Shows/sagas'),
          import('components/Shows'),
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
          import('components/Post/reducer'),
          import('components/Post/sagas'),
          import('components/Post'),
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
          import('components/Show/reducer'),
          import('components/Show/sagas'),
          import('components/Show'),
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
      path: '/sendeplan',
      name: 'sendeplan',
      exact: true,
      component: asyncComponent(() =>
        Promise.all([
          import('components/Sendeplan/reducer'),
          import('components/Sendeplan/sagas'),
          import('components/Sendeplan'),
        ])
          .then(([reducer, sagas, component]) => {
            injectReducer('sendeplan', reducer.default);
            injectSagas(sagas.default);
            return component;
          })
          .catch(errorLoading),
      ),
    },
    {
      path: '/plainpost/:slug',
      name: 'plainpost',
      component: asyncComponent(() =>
        Promise.all([
          import('components/Post/reducer'),
          import('components/Post/sagas'),
          import('components/Post'),
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
      path: '*',
      name: 'notfound',
      component: asyncComponent(() =>
        import('components/NotFound').catch(errorLoading),
      ),
    },
  ];
}
