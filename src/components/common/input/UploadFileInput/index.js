import React from 'react';

import styles from './styles.css';

const UploadFileInput = props => (
  <div className={styles.uploadFileInput}>
    <span className={styles.label}>{props.label}</span>
    <input className="fileInput" type="file" onChange={props.onChange} />
  </div>
);

UploadFileInput.propTypes = {
  onChange: React.PropTypes.func,
  label: React.PropTypes.string,
};

export default UploadFileInput;
