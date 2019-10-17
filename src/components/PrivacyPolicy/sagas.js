import { call, put, takeEvery } from 'redux-saga/effects';

import { getGraphQL } from 'utils/api';
import { LOAD_PRIVACY_POLICY_PENDING } from './constants';
import { privacyPolicyLoaded, privacyPolicyError } from './actions';

export function* loadPrivacyPolicy() {
  console.log('fetching privacy policy');
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

export default [takeEvery(LOAD_PRIVACY_POLICY_PENDING, loadPrivacyPolicy)];
