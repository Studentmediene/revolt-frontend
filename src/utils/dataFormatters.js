/*
  Functions used to convert GraphQL data to a format that fits the frontend
*/
export const showFormat = ({
  id,
  name,
  image,
  content,
  lead,
  slug,
  archived,
  categories,
  isPodcast,
  podcastUrl,
}) => ({
  logoImageUrl: `${image}`,
  id,
  title: name,
  content,
  lead,
  slug,
  archived,
  categories,
  isPodcast,
  podcastUrl,
});

export const episodeFormat = ({ id, title, showName, publishAt, lead }) => ({
  id,
  title,
  showName,
  publishAt,
  lead,
});

export const postFormat = ({
  id,
  croppedImages,
  publishAt,
  title,
  slug,
  lead,
  content,
  categories,
  episodes,
}) => ({
  id,
  croppedImages,
  publishAt,
  title,
  slug,
  lead,
  content,
  categories,
  episodes,
});
