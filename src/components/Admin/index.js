import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import selectAdmin from './selectors';
import styles from './styles.css';
import svgBlog from './blog.svg';
import svgMic from './microphone.svg';
import svgShow from './show.svg';
import AdminOptionButton from 'components/common/button/AdminOptionButton';

const Admin = () => (
  <div className={styles.admin}>
    <div className={styles.adminRow}>
      <AdminOptionButton
        name="Blogginnlegg"
        image={svgBlog}
        newObjectPath="/admin/post/ny"
        editObjectPath="/admin/post/endre"
      />
      <AdminOptionButton
        name="Episoder"
        image={svgMic}
        newObjectPath="/admin/episoder/ny"
        editObjectPath="/admin/episoder/endre"
      />
      <AdminOptionButton
        name="Programmer"
        image={svgShow}
        newObjectPath="/admin/programmer/ny"
        editObjectPath="/admin/programmer/endre"
      />
    </div>
  </div>
);

const mapStateToProps = selectAdmin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
