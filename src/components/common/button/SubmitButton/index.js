import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const SubmitButton = props => (
  <button
    className={
      props.disabled ? styles.submitButtonDisabled : styles.submitButtonEnabled
    }
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
