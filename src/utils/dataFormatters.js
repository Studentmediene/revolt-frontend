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
}) => ({
  logoImageUrl: `${image}`,
  id,
  title: name,
  content,
  lead,
  slug,
  archived,
  categories,
});

export const episodeFormat = ({ id, title, showName, publishAt, lead }) => ({
  id,
  title,
  showName,
  publishAt,
  lead,
});

export const newestEpisodesFormat = ({ id, title, show, publishAt }) => ({
  id,
  title,
  imgURL: show.image,
  name: show.name,
  publishAt,
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
