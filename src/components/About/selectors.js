import { createSelector } from 'reselect';

const selectAboutDomain = () => state => state.get('about');

const selectAbout = () =>
  createSelector(selectAboutDomain(), about => about.get('about'));

const selectAboutLoading = () =>
  createSelector(selectAboutDomain(), about => about.get('loading'));

const selectAboutError = () =>
  createSelector(selectAboutDomain(), about => about.get('error'));

export { selectAbout, selectAboutLoading, selectAboutError };
