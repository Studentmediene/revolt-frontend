import {
  LOAD_CATEGORIES_PENDING,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILED,
} from './constants';

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES_PENDING,
  };
}

export function categoriesLoaded(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    categories,
  };
}

export function categoriesLoadedError() {
  return {
    type: LOAD_CATEGORIES_FAILED,
  };
}
