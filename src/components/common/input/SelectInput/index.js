import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const SelectInput = props => {
  if (props.options) {
    return (
      <div className={styles.selectInput}>
        <span className={styles.label}>{props.label}</span>
        <select onChange={event => props.onChange(event, props)}>
          {props.options}
        </select>
      </div>
    );
  }
  return <div />;
};

SelectInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
};

export default SelectInput;
