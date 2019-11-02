import {
  LOAD_PRIVACY_POLICY_PENDING,
  LOAD_PRIVACY_POLICY_SUCCESS,
  LOAD_PRIVACY_POLICY_FAILED,
} from './constants';

export function loadPrivacyPolicy() {
  return {
    type: LOAD_PRIVACY_POLICY_PENDING,
  };
}

export function privacyPolicyLoaded(content) {
  return {
    type: LOAD_PRIVACY_POLICY_SUCCESS,
    content,
  };
}

export function privacyPolicyError() {
  return {
    type: LOAD_PRIVACY_POLICY_FAILED,
  };
}
