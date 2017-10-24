import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const LinkButton = props => (
  <Link className={styles.wrapper} to={props.to}>
    <button className={styles.button}>{props.text}</button>
  </Link>
);

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default LinkButton;
