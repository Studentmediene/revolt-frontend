import React from 'react';
import PropTypes from 'prop-types';

import Meta from 'components/Meta';

const ShowMeta = props => {
  const {
    host,
    url,
    show: { title, lead: description, logoImageUrl },
  } = props;
  const image = host + logoImageUrl;
  const suffix = ' - Radio Revolt';
  return (
    <Meta
      browserTitle={title + suffix}
      pageTitle={title}
      url={url}
      type="article"
      description={description}
      image={image}
    />
  );
};

ShowMeta.propTypes = {
  host: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
};

export default ShowMeta;
