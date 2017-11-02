import { createSelector } from 'reselect';

/**
 * Direct selector to the sendeplan state domain
 */
const selectSendeplanDomain = () => state => state.get('sendeplan');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Sendeplan
 */


const selectSendeplan = () => createSelector(
  selectSendeplanDomain(),
  (substate) => substate.get('sendeplan'),
);
const selectSendeplanLoading = () => createSelector(
  selectSendeplanDomain(),
  (substate) => substate.get('loading'),
);
const selectSendeplanError = () => createSelector(
  selectSendeplanDomain(),
  (substate) => substate.get('error'),
);

export {
  selectSendeplan,
  selectSendeplanLoading,
  selectSendeplanError,
};
