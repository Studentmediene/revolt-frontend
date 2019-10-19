import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import 'components/common/styles/editor.scss';

const ShowHeader = ({
  show: {
    show: { title, content, logoImageUrl, categories },
  },
}) => {
  let categoryTags;
  if (categories && categories.length > 0) {
    categoryTags = (
      <div className={styles.categories}>
        <span>Kategorier: </span>
        {categories.map((category, index) => (
          <span key={index}>{category.name}</span>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={logoImageUrl} alt={title} />
      </div>
      <div className={styles.showText}>
        <h2 className={styles.title}>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      {categoryTags}
    </div>
  );
};

ShowHeader.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default ShowHeader;
