import React from 'react';

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
  label: React.PropTypes.string,
  options: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
  onChange: React.PropTypes.func.isRequired,
};

export default SelectInput;
