
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/graphql' : '/graphql';
const PAPPAGORG_API_URL = 'http://api.radiorevolt.no/v1/';
const PODKAST_API_URL = 'http://api.radiorevolt.no/api/url/';
const SENDEPLAN_API_URL = 'http://api.radiorevolt.no/v1/sendinger/dato/';

const handleError = res => {
  if (res.ok) return res;
  const err = new Error(res.status);
  err.text = res.statusText;
  throw err;
};

export const NEW_API_URL = 'http://localhost:9000/';
export const SHOWS_URL = `${NEW_API_URL}shows/`;
export const POSTS_URL = `${NEW_API_URL}posts/`;
export const EPISODES_URL = `${NEW_API_URL}episodes/`;
export const CATEGORIES_URL = `${NEW_API_URL}categories/`;

export const PAPPAGORG_EPISODE_URL = `${PAPPAGORG_API_URL}lyd/ondemand/`;
export const PAPPAGORG_SHOWS_URL = `${PAPPAGORG_API_URL}programmer/list/`;

export const get = url => fetch(url).then(handleError).then(res => res.json());
export const getSendeplan = (year, month, date) => fetch(`${SENDEPLAN_API_URL}${year}/${month}/${date}/autoavvikler`).then(handleError).then(res => res.json());

export const post = (url, body) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
}).then(handleError).then(res => res.json());

export const getGraphQL = query => get(`${API_URL}?query=${query}`);

export const getPodcastUrl = showId => fetch(`${PODKAST_API_URL}${showId}`).then(res => res.text());

export const getPodcasts = showId => get(`http://api.radiorevolt.no/v1/lyd/podcast/${showId}`);

export const getOnDemand = showId => get(`http://api.radiorevolt.no/v1/lyd/ondemand/${showId}`);
