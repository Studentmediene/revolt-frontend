import { fromJS } from 'immutable';
import {
  LOAD_SENDEPLAN_PENDING,
  LOAD_SENDEPLAN_SUCCESS,
  LOAD_SENDEPLAN_FAILED,
  GET_NEXT_DAY,
  GET_PREV_DAY,
} from './constants';
import moment from 'moment';

const initialState = fromJS({
  loading: false,
  error: false,
  sendeplan: {},
  currentDay: moment(),
  nextDay: moment().add(1, 'days'),
});

function sendeplanReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SENDEPLAN_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_SENDEPLAN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set(
          'sendeplan',
          state.get('sendeplan').merge(fromJS(action.sendeplans)),
        );
    case LOAD_SENDEPLAN_FAILED:
      return state.set('loading', false).set('error', true);
    case GET_NEXT_DAY:
      return state
        .set(
          'currentDay',
          moment(state.get('currentDay'))
            .clone()
            .add(1, 'days'),
        )
        .set(
          'nextDay',
          moment(state.get('nextDay'))
            .clone()
            .add(1, 'days'),
        )
        .set('loading', true)
        .set('error', false);

    case GET_PREV_DAY:
      return state
        .set(
          'currentDay',
          moment(state.get('currentDay'))
            .clone()
            .subtract(1, 'days'),
        )
        .set(
          'nextDay',
          moment(state.get('nextDay'))
            .clone()
            .subtract(1, 'days'),
        )
        .set('loading', true)
        .set('error', false);
    default:
      return state;
  }
}

export default sendeplanReducer;
