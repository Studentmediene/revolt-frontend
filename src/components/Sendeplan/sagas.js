import { call, put, takeEvery } from 'redux-saga/effects';

import {
  LOAD_SENDEPLAN_PENDING,
  GET_NEXT_DAY,
  GET_PREV_DAY,
} from './constants';
import { timestampKey } from './utils';
import { getSendeplan } from 'utils/api';
import { sendeplanSuccess, sendeplanError } from './actions';

export function* loadSendeplan(action) {
  console.log('fetching sendeplan');
  try {
    const results = {};
    for (let timestamp of action.timestamps) {
      const year = timestamp.year();
      const month = timestamp.month() + 1;
      const date = timestamp.date();
      results[timestampKey(year, month, date)] = yield call(
        getSendeplan,
        year,
        month,
        date,
      );
    }

    yield put(sendeplanSuccess(results));
  } catch (error) {
    yield put(sendeplanError());
  }
}

export default [
  takeEvery(LOAD_SENDEPLAN_PENDING, loadSendeplan),
  takeEvery(GET_NEXT_DAY, loadSendeplan),
  takeEvery(GET_PREV_DAY, loadSendeplan),
];
