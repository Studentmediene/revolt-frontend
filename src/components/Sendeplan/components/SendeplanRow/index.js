import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const SendePlanRow = ({ hour, showName, isActive }) => (
  <div
    key={hour}
    className={classNames(styles.row, {
      [styles.activeNow]: isActive,
    })}
  >
    <div className={styles.time}>{String(hour).padStart(2, '0')}:00</div>
    <div className={styles.title}>{showName}</div>
  </div>
);

SendePlanRow.propTypes = {
  hour: PropTypes.number.isRequired,
  showName: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SendePlanRow;
