import React from 'react';
import PropTypes from 'prop-types';
import CategoryTag from 'components/common/tag/CategoryTag';
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
        {categories.map((category, index) => (
          <CategoryTag {...category} index={index} key={index} />
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
        {categoryTags}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

ShowHeader.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default ShowHeader;
