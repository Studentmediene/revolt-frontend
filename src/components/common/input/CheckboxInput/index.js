import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const CheckboxInput = props => {
  return (
    <div className={styles.checkboxWrapper}>
      <label htmlFor={props.label} className={styles.checkboxLabel}>
        <input
          type="checkbox"
          id={props.label}
          onChange={props.onChange}
          checked={props.value}
          className={styles.checkboxInput}
        />
        {props.label}
      </label>
    </div>
  );
};

CheckboxInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckboxInput;
