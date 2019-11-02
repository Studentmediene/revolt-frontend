export function getUrlInfo(req, isServer) {
  const protocol = 'https://';
  let host = '';
  let url = '';

  if (isServer) {
    host = `${req.protocol}://${req.headers.host}`;
    url = `${req.protocol}://${req.headers.host}${req.url}`;
  } else {
    host = `${window.location.protocol}//${window.location.host}`;
    url = window.location.href;
  }

  console.log(host);
  console.log(url);
  return {
    host,
    url,
  };
}
