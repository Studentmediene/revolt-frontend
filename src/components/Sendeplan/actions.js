import {
  LOAD_SENDEPLAN_PENDING,
  LOAD_SENDEPLAN_SUCCESS,
  LOAD_SENDEPLAN_FAILED,
  GET_NEXT_DAY,
  GET_PREV_DAY,
} from './constants';

export function loadSendeplan(timestamp) {
  return {
    type: LOAD_SENDEPLAN_PENDING,
    timestamp,
  };
}

export function sendeplanSuccess(sendeplan, year, month, date) {
  return {
    type: LOAD_SENDEPLAN_SUCCESS,
    sendeplan,
    year,
    month,
    date,
  };
}

export function sendeplanError() {
  return {
    type: LOAD_SENDEPLAN_FAILED,
  };
}

export function getNextDay(timestamp) {
  return {
    type: GET_NEXT_DAY,
    timestamp: timestamp.clone().add(1, 'days'),
  };
}

export function getPrevDay(timestamp) {
  return {
    type: GET_PREV_DAY,
    timestamp: timestamp.clone().subtract(1, 'days'),
  };
}
