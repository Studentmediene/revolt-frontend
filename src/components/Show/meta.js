import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = props => {
  const {
    host,
    url,
    show: { title, lead: description, logoImageUrl },
  } = props;
  const image = host + logoImageUrl;
  const suffix = ' - Radio Revolt';
  return (
    <Head>
      <title key="title">{title + suffix}</title>
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:type" property="og:type" content="article" />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={image} />
    </Head>
  );
};

Meta.propTypes = {
  host: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
};

export default Meta;
