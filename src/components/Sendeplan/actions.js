import {
  LOAD_SENDEPLAN_PENDING,
  LOAD_SENDEPLAN_SUCCESS,
  LOAD_SENDEPLAN_FAILED,
  GET_NEXT_DAY,
  GET_PREV_DAY,
  SET_ACTIVE_DAYS,
} from './constants';

export function loadSendeplans(timestamps) {
  return {
    type: LOAD_SENDEPLAN_PENDING,
    timestamps,
  };
}

export function sendeplanSuccess(sendeplans) {
  return {
    type: LOAD_SENDEPLAN_SUCCESS,
    sendeplans,
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
    timestamps: [timestamp.clone().add(1, 'days')],
  };
}

export function getPrevDay(timestamp) {
  return {
    type: GET_PREV_DAY,
    timestamps: [timestamp.clone().subtract(1, 'days')],
  };
}

export function setActiveDays(currentDay, nextDay) {
  return {
    type: SET_ACTIVE_DAYS,
    currentDay,
    nextDay,
  };
}
