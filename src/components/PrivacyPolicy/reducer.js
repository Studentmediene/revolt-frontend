import { fromJS } from 'immutable';
import {
  LOAD_PRIVACY_POLICY_PENDING,
  LOAD_PRIVACY_POLICY_SUCCESS,
  LOAD_PRIVACY_POLICY_FAILED,
} from './constants';

const initialState = fromJS({
  privacyPolicy: '',
  loading: false,
  error: false,
});

function privacyPolicyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRIVACY_POLICY_PENDING:
      return state.set('loading', true).set('error', false);
    case LOAD_PRIVACY_POLICY_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('privacyPolicy', action.privacyPolicy);
    case LOAD_PRIVACY_POLICY_FAILED:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default privacyPolicyReducer;
