import { createSelector } from 'reselect';

const selectSendeplanDomain = () => state => state.get('sendeplan');

const selectSendeplan = () =>
  createSelector(selectSendeplanDomain(), substate =>
    substate.get('sendeplan'),
  );

const selectSendeplanLoading = () =>
  createSelector(selectSendeplanDomain(), substate => substate.get('loading'));

const selectSendeplanError = () =>
  createSelector(selectSendeplanDomain(), substate => substate.get('error'));

export { selectSendeplan, selectSendeplanLoading, selectSendeplanError };
