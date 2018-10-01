import { createSelector } from 'reselect';

const selectPrivacyPolicyDomain = () => state => state.get('privacyPolicy');

const selectPrivacyPolicy = () =>
  createSelector(selectPrivacyPolicyDomain(), about =>
    about.get('privacyPolicy'),
  );

const selectPrivacyPolicyLoading = () =>
  createSelector(selectPrivacyPolicyDomain(), about => about.get('loading'));

const selectPrivacyPolicyError = () =>
  createSelector(selectPrivacyPolicyDomain(), about => about.get('error'));

export {
  selectPrivacyPolicy,
  selectPrivacyPolicyLoading,
  selectPrivacyPolicyError,
};
