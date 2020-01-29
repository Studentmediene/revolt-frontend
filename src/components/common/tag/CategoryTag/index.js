import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './styles.scss';

const CategoryTag = props => {
  const style = {
    backgroundColor: `${props.backgroundColor}`,
    color: `${props.textColor}`,
  };
  if (props.position === 'top') {
    style.marginTop = `${props.index * 2 + 0.4}em`;
  } else {
    style.marginTop = `-${(props.index + 1) * 2}em`;
  }

  return (
    <div className={styles.category} style={style}>
      {props.name}
    </div>
  );
};

CategoryTag.propTypes = {
  position: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default CategoryTag;
