import React from 'react';

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
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default CheckboxInput;
