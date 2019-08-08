import { createSelector } from 'reselect';

export const selectRouterDomain = () => state => state.get('router');

export const selectLocation = () =>
  createSelector(selectRouterDomain(), substate =>
    substate.get('location'),
  );
  export const selectPathname = () =>
  createSelector(selectLocation(), substate =>
    substate.get('pathname'),
  );
  export const selectSearch = () =>
  createSelector(selectLocation(), substate =>
    substate.get('search'),
  );

  export const selectHash = () =>
  createSelector(selectLocation(), substate =>
    substate.get('hash'),
  );

