import { createSelector } from 'reselect';

const selectAboutDomain = () => state => state.get('about');

const selectContent = () =>
  createSelector(
    selectAboutDomain(),
    about => about.get('content'),
  );

const selectAboutLoading = () =>
  createSelector(
    selectAboutDomain(),
    about => about.get('loading'),
  );

const selectAboutError = () =>
  createSelector(
    selectAboutDomain(),
    about => about.get('error'),
  );

export { selectContent, selectAboutLoading, selectAboutError };
