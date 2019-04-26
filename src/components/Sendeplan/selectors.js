import { createSelector } from 'reselect';

export const selectSendeplanDomain = () => state => state.get('sendeplan');

export const selectSendeplan = () =>
  createSelector(selectSendeplanDomain(), substate =>
    substate.get('sendeplan'),
  );

export const selectSendeplanLoading = () =>
  createSelector(selectSendeplanDomain(), substate => substate.get('loading'));

export const selectSendeplanError = () =>
  createSelector(selectSendeplanDomain(), substate => substate.get('error'));

export const selectSendeplanNextDay = () =>
  createSelector(selectSendeplanDomain(), substate => substate.get('nextDay'));

export const selectSendeplanCurrentDay = () =>
  createSelector(selectSendeplanDomain(), substate =>
    substate.get('currentDay'),
  );
