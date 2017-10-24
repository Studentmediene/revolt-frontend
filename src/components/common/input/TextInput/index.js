import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const TextInput = props => (
  <div className={styles.textFieldWrapper}>
    <span className={styles.label}>{props.label}</span>
    <input
      type="text"
      className={styles.textField}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
);

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
