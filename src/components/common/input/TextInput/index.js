import React from 'react';

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
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default TextInput;
