import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from 'components/common/button/LinkButton';

import styles from './styles.css';

const AdminOptionButton = props => {
  return (
    <div className={styles.adminOptionButton}>
      <h2 className={styles.title}>{props.name}</h2>
      <img src={props.image} alt={props.name} className={styles.image} />
      <LinkButton to={props.newObjectPath} text="Opprett" />
      <LinkButton to={props.editObjectPath} text="Endre" />
    </div>
  );
};

AdminOptionButton.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  newObjectPath: PropTypes.string,
  editObjectPath: PropTypes.string,
};

export default AdminOptionButton;
