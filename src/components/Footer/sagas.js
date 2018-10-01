import { call, put, takeEvery } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_FOOTER_PENDING } from './constants';
import { footerLoaded, footerError } from './actions';

// Individual exports for testing
export function* loadFooter() {
  const query = `query {
    settings {
      chiefEditor,
      radioEditor
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(
      footerLoaded({
        chiefEditor: result.data.settings.chiefEditor,
        radioEditor: result.data.settings.radioEditor,
      }),
    );
  } catch (error) {
    yield put(footerError());
  }
}

export function* loadFooterWatcher() {
  yield takeEvery(LOAD_FOOTER_PENDING, loadFooter);
}

// All sagas to be loaded
export default [loadFooterWatcher];
