import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  sendeplanSuccess,
  sendeplanError,
} from './actions';
import { LOAD_SENDEPLAN_PENDING } from './constants';
import { getSendeplan } from 'utils/api';

// Individual exports for testing
export function* loadSendeplan(action) {
  try {
    const result = yield call(getSendeplan, action.year, action.month + 1, action.day);
    yield put(sendeplanSuccess(result, action.weekDay));
  } catch (error) {
    yield put(sendeplanError());
  }
}

export function* loadSendeplanWatcher() {
  while (true) { // eslint-disable-line no-constant-condition
    yield takeEvery(LOAD_SENDEPLAN_PENDING, loadSendeplan);
  }
}

// All sagas to be loaded
export default [
  loadSendeplanWatcher,
];
