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

export const getCurrentShows = () =>
  get(`${API_URL}/v2/sendinger/currentshows`);

export const SENDEPLAN_API_URL = `${API_URL}/v1/sendinger/dato/`;

export const getSendeplan = (year, month, date) =>
  fetch(`${SENDEPLAN_API_URL}${year}/${month}/${date}/autoavvikler`)
    .then(handleError)
    .then(res => res.json());
