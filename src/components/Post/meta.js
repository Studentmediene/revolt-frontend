import React from 'react';
import PropTypes from 'prop-types';

import Meta from 'components/Meta';

const PostMeta = props => {
  const {
    host,
    url,
    post: {
      title,
      lead: description,
      croppedImages: { medium: imageUrl },
    },
  } = props;
  const image = host + imageUrl;
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

PostMeta.propTypes = {
  host: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
};

export default PostMeta;
