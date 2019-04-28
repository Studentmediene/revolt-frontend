import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label: lab, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={lab}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
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
