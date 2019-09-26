import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Checkbox = ({
  label: lab,
  isSelected,
  backgroundColor,
  textColor,
  onCheckboxChange,
  className,
}) => (
  <div className={styles.checkbox}>
    <label>
      <input
        className={styles.box}
        type="checkbox"
        name={lab}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      <div
        style={{ backgroundColor: backgroundColor, textColor: textColor }}
        className={styles.text}
      >
        {lab}
      </div>
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,

  isSelected: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
