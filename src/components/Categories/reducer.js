import { fromJS } from 'immutable';
import {
  LOAD_CATEGORIES_PENDING,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  categories: false,
});

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_CATEGORIES_SUCCESS:
      return state
        .set('categories', action.categories)
        .set('loading', false)
        .set('error', false);
    case LOAD_CATEGORIES_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
};

export default categoriesReducer;
