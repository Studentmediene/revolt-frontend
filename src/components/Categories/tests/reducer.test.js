import categoriesReducer from '../reducer';
import { fromJS } from 'immutable';

describe('categoriesReducer', () => {
  it('returns the initial state', () => {
    expect(categoriesReducer(fromJS({}), {})).toEqual(fromJS({}));
  });
});
