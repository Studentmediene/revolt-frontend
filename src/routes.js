import { getAsyncInjectors } from 'utils/asyncInjectors';
import asyncComponent from 'utils/asyncComponent';

const errorLoading = err => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

export default function createRoutes(store) {
  return [
    {
      path: '*',
      name: 'notfound',
      component: asyncComponent(() =>
        import('components/NotFound').catch(errorLoading),
      ),
    },
  ];
}
