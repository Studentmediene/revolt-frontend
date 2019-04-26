import { call, put, takeEvery } from 'redux-saga/effects';
import { sendeplanSuccess, sendeplanError } from './actions';
import {
  LOAD_SENDEPLAN_PENDING,
  GET_NEXT_DAY,
  GET_PREV_DAY,
} from './constants';
import { getSendeplan } from 'utils/api';

// Individual exports for testing
export function* loadSendeplan(action) {
  try {
    const year = action.timestamp.year();
    const month = action.timestamp.month() + 1;
    const date = action.timestamp.date();
    const result = yield call(getSendeplan, year, month, date);
    yield put(sendeplanSuccess(result, year, month, date));
  } catch (error) {
    yield put(sendeplanError());
  }
}

export function* loadSendeplanWatcher() {
  yield takeEvery(LOAD_SENDEPLAN_PENDING, loadSendeplan);
}

export function* getNextDayWatcher() {
  yield takeEvery(GET_NEXT_DAY, loadSendeplan);
}

export function* getPrevDayWatcher() {
  yield takeEvery(GET_PREV_DAY, loadSendeplan);
}

// All sagas to be loaded
export default [loadSendeplanWatcher, getNextDayWatcher, getPrevDayWatcher];
