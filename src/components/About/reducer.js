import { fromJS } from 'immutable';
import {
  LOAD_ABOUT_PENDING,
  LOAD_ABOUT_SUCCESS,
  LOAD_ABOUT_FAILED,
} from './constants';

const initialState = fromJS({
  about: '',
  loading: false,
  error: false,
});

function aboutReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ABOUT_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_ABOUT_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('about', action.about);
    case LOAD_ABOUT_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default aboutReducer;
