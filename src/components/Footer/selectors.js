import { createSelector } from 'reselect';

const selectFooterDomain = () => state => state.get('footer');

const selectChiefEditor = () =>
  createSelector(selectFooterDomain(), about => about.get('chiefEditor'));

const selectRadioEditor = () =>
  createSelector(selectFooterDomain(), about => about.get('radioEditor'));

const selectFooterLoading = () =>
  createSelector(selectFooterDomain(), about => about.get('loading'));

const selectFooterError = () =>
  createSelector(selectFooterDomain(), about => about.get('error'));

export {
  selectChiefEditor,
  selectRadioEditor,
  selectFooterLoading,
  selectFooterError,
};
