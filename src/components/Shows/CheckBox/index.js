import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Checkbox = ({ label: lab, isSelected, onCheckboxChange, className }) => (
  <div className={styles.checkbox}>
    <label>
      <input
        className={styles.box}
        type="checkbox"
        name={lab}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      {lab}
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
