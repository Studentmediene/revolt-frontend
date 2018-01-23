const GRAPHQL_URL = '/graphql';
const API_URL = 'https://api.radiorevolt.no';
export const MEDIA_URL = '/media/';

const handleError = res => {
  if (res.status < 300) return res;
  const err = new Error(res.status);
  err.text = res.statusText;
  throw err;
};

export const get = url =>
  fetch(url)
    .then(handleError)
    .then(res => res.json());

export const getGraphQL = query => get(`${GRAPHQL_URL}?query=${query}`);

export const getPodcasts = showId => `${API_URL}/v1/lyd/podcast/${showId}`;

export const getOnDemand = showId => `${API_URL}/v1/lyd/ondemand/${showId}`;

export const SENDEPLAN_API_URL = `${API_URL}/v1/sendinger/dato/`;

export const getSendeplan = (year, month, date) =>
  fetch(`${SENDEPLAN_API_URL}${year}/${month}/${date}/autoavvikler`)
    .then(handleError)
    .then(res => res.json());

// Lazy way to ignore undefined imports in not yet used files
export const CATEGORIES_URL = null;
export const POSTS_URL = null;
export const EPISODES_URL = null;
export const SHOWS_URL = null;
export const PAPPAGORG_SHOWS_URL = null;
export const post = null;
export const getDigasOnDemandEpisodes = null;
export const getDigasPodcastEpisodes = null;
export const update = null;
export const apiDelete = null;
export const getPodcastUrl = null;
