import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const UploadFileInput = props => (
  <div className={styles.uploadFileInput}>
    <span className={styles.label}>{props.label}</span>
    <input className="fileInput" type="file" onChange={props.onChange} />
  </div>
);

UploadFileInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default UploadFileInput;
