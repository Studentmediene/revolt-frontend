import { MEDIA_URL } from './api';
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
}) => ({
  logoImageUrl: `${image}`,
  id,
  title: name,
  content,
  lead,
  slug,
  archived,
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
  image,
  publishAt,
  title,
  slug,
  lead,
  content,
  categories,
  episodes,
}) => ({
  id,
  coverPhotoUrl: `${MEDIA_URL}${image}`,
  publishAt,
  title,
  slug,
  lead,
  content,
  categories,
  episodes,
});
