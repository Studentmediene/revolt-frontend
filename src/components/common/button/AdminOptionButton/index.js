import React from 'react';
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
  image: React.PropTypes.string,
  name: React.PropTypes.string,
  newObjectPath: React.PropTypes.string,
  editObjectPath: React.PropTypes.string,
};

export default AdminOptionButton;
