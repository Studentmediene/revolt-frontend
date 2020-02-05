import { createSelector } from 'reselect';

const selectFooterDomain = () => state => state.get('footer');

const selectChiefEditor = () =>
  createSelector(selectFooterDomain(), about => about.get('chiefEditor'));

const selectRadioEditor = () =>
  createSelector(selectFooterDomain(), about => about.get('radioEditor'));

const selectMusicProducer = () =>
  createSelector(selectFooterDomain(), about => about.get('musicProducer'));

const selectCulturalProducer = () =>
  createSelector(selectFooterDomain(), about => about.get('culturalProducer'));

const selectEntertainmentProducer = () =>
  createSelector(selectFooterDomain(), about => about.get('entertainmentProducer'));

const selectFooterLoading = () =>
  createSelector(selectFooterDomain(), about => about.get('loading'));

const selectFooterError = () =>
  createSelector(selectFooterDomain(), about => about.get('error'));

export {
  selectChiefEditor,
  selectRadioEditor,
  selectMusicProducer,
  selectCulturalProducer,
  selectEntertainmentProducer,
  selectFooterLoading,
  selectFooterError,
};
