import { call, put, takeEvery } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_PRIVACY_POLICY_PENDING } from './constants';
import { privacyPolicyLoaded, privacyPolicyError } from './actions';

// Individual exports for testing
export function* loadPrivacyPolicy() {
  const query = `query {
    settings {
      privacyPolicy
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(privacyPolicyLoaded(result.data.settings.privacyPolicy));
  } catch (error) {
    yield put(privacyPolicyError());
  }
}

export function* loadPrivacyPolicyWatcher() {
  yield takeEvery(LOAD_PRIVACY_POLICY_PENDING, loadPrivacyPolicy);
}

// All sagas to be loaded
export default [loadPrivacyPolicyWatcher];
