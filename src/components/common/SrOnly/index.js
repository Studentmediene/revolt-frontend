import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

/**
 * Component whose contents are announced by screen-readers, but hidden visually.
 */
const SrOnly = ({ children, element, ...restProps }) => {
  // JSX requires element names to be Capitalized
  const ElementToUse = element;

  return (
    <ElementToUse {...restProps} className={styles.srOnly}>
      {children}
    </ElementToUse>
  );
};

SrOnly.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
};

SrOnly.defaultProps = {
  element: 'div',
};

export default SrOnly;
