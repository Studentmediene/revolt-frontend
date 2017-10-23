import React from 'react';

import styles from './styles.css';

const TextAreaInput = props => (
  <div className={styles.textAreaInputWrapper}>
    <span className={styles.label}>{props.label}</span>
    <textarea
      type="text"
      className={styles.textAreaInput}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
);

TextAreaInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default TextAreaInput;
