import { createSelector } from 'reselect';

/**
 * Direct selector to the shows state domain
 */
const selectCategoriesDomain = () => state => state.get('categories');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Shows
 */

export const selectCategories = () =>
  createSelector(selectCategoriesDomain(), categoryState =>
    categoryState.get('categories'),
  );

export const selectCategoriesLoading = () =>
  createSelector(selectCategoriesDomain(), categoryState =>
    categoryState.get('loading'),
  );

export const selectCategoriesError = () =>
  createSelector(selectCategoriesDomain(), categoryState =>
    categoryState.get('error'),
  );

export default {
  selectCategoriesDomain,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
};
