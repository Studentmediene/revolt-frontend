import { MEDIA_URL } from './api';
/*
  Functions used to convert GraphQL data to a format that fits the frontend
*/
export const showFormat = ({ id, name, image, lead, slug, archived }) => ({
  logoImageUrl: `${image}`,
  id,
  title: name,
  lead,
  slug,
  archived,
});

export const episodeFormat = ({ id, showName, createdAt, lead }) => ({
  id,
  showName,
  publishAt: createdAt,
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
}) => ({
  id,
  coverPhotoUrl: `${MEDIA_URL}${image}`,
  publishAt,
  title,
  slug,
  lead,
  content,
});
