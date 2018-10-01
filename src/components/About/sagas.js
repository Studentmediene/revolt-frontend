import { call, put, takeEvery } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_ABOUT_PENDING } from './constants';
import { aboutLoaded, aboutError } from './actions';

// Individual exports for testing
export function* loadAbout() {
  const query = `query {
    settings {
      about
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(aboutLoaded(result.data.settings.about));
  } catch (error) {
    yield put(aboutError());
  }
}

export function* loadAboutWatcher() {
  yield takeEvery(LOAD_ABOUT_PENDING, loadAbout);
}

// All sagas to be loaded
export default [loadAboutWatcher];
