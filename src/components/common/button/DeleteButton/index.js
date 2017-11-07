import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const DeleteButton = props => {
  return (
    <button
      className={styles.deleteButton}
      onClick={() => {
        const response = window.confirm(props.confirmText);
        // eslint-disable-line no-alert
        if (response) {
          props.onClick();
        }
      }} // eslint-disable-line no-alert
    >
      {props.children}
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default DeleteButton;
