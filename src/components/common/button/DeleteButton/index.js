import React from 'react';

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
  onClick: React.PropTypes.func.isRequired,
  confirmText: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
};

export default DeleteButton;
