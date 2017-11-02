import expect from 'expect';
import sendeplanReducer from '../reducer';
import { fromJS } from 'immutable';

describe('sendeplanReducer', () => {
  it('returns the initial state', () => {
    expect(sendeplanReducer(undefined, {})).toEqual(fromJS({}));
  });
});
