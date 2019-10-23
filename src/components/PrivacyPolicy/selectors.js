import { createSelector } from 'reselect';

const selectPrivacyPolicyDomain = () => state => state.get('privacyPolicy');

const selectContent = () =>
  createSelector(
    selectPrivacyPolicyDomain(),
    about => about.get('content'),
  );

const selectPrivacyPolicyLoading = () =>
  createSelector(
    selectPrivacyPolicyDomain(),
    about => about.get('loading'),
  );

const selectPrivacyPolicyError = () =>
  createSelector(
    selectPrivacyPolicyDomain(),
    about => about.get('error'),
  );

export { selectContent, selectPrivacyPolicyLoading, selectPrivacyPolicyError };
