import { take, call, put } from 'redux-saga/effects';
import { categoriesLoaded, categoriesLoadedError } from './actions';
import { LOAD_CATEGORIES_PENDING } from './constants';
import { get, CATEGORIES_URL } from 'utils/api';

// Individual exports for testing
export function* getCategories() {
  try {
    const result = yield get(CATEGORIES_URL);
    yield put(categoriesLoaded(result));
  } catch (error) {
    yield put(categoriesLoadedError());
  }
}

export function* loadCategoriesWatcher() {
  while (yield take(LOAD_CATEGORIES_PENDING)) {
    yield call(getCategories);
  }
}

// All sagas to be loaded
export default [loadCategoriesWatcher];
