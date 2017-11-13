/*
 *
 * Sendeplan reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_SENDEPLAN_PENDING,
  LOAD_SENDEPLAN_SUCCESS,
  LOAD_SENDEPLAN_FAILED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  sendeplan: {},
});

function sendeplanReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SENDEPLAN_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_SENDEPLAN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('sendeplan', {
          ...state.get('sendeplan'),
          [action.weekDay]: action.sendeplan,
        });
    case LOAD_SENDEPLAN_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default sendeplanReducer;
