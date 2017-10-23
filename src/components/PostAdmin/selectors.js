import { createSelector } from 'reselect';

/**
 * Direct selector to the postAdmin state domain
 */
const selectPostAdminDomain = () => state => state.get('postAdmin');

/**
 * Other specific selectors
 */

/**
 * Default selector used by PostAdmin
 */

const selectPostAdmin = () =>
  createSelector(selectPostAdminDomain(), substate => substate.toJS());

export default selectPostAdmin;
export { selectPostAdminDomain };
