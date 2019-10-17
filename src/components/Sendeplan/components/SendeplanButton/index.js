import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const SendeplanButton = ({ onClick, children }) => (
  <div className={styles.buttonWrapper}>
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  </div>
);
SendeplanButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SendeplanButton;
