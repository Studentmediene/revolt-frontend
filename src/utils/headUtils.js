export function getUrlInfo(req, isServer) {
  let host = '';
  let url = '';

  if (isServer) {
    host = `${req.protocol}://${req.headers.host}`;
    url = `${req.protocol}://${req.headers.host}${req.url}`;
  } else {
    host = `${window.location.protocol}//${window.location.host}`;
    url = window.location.href;
  }
  return {
    host,
    url,
  };
}
