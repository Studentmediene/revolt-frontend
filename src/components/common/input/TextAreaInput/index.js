import React from 'react';
import PropTypes from 'prop-types';

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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextAreaInput;
