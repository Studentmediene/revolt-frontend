const robots = (req, res) => {
  res.header('Content-Type', 'text/plain');
  if (process.env.BETA) {
    // Do not crawl BETA
    res.send(
      `User-agent: *
Disallow: /`,
    );
  } else {
    res.send(
      `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://radiorevolt.no/sitemap.xml`,
    );
  }
};

module.exports = robots;
