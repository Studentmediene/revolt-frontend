import { fromJS } from 'immutable';
import {
  LOAD_SHOW_PENDING,
  LOAD_SHOW_SUCCESS,
  LOAD_SHOW_FAILED,
} from './constants';

const initialState = fromJS({
  show: {},
  loading: false,
  error: false,
});

function showReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOW_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_SHOW_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set(
          'show',
          state.get('show').merge(
            fromJS({
              [action.slug]: action.show,
            }),
          ),
        );
    case LOAD_SHOW_FAILED:
      return state.set('loading', true).set('error', false);
    default:
      return state;
  }
}

export default showReducer;
