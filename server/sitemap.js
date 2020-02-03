require('isomorphic-unfetch');
const moment = require('moment');

module.exports = (req, res) => {
  if (process.env.BETA) {
    res.sendStatus(404);
    return;
  }
  res.header('Content-Type', 'application/xml');
  (async function sendXML() {
    let xmlFile = await createSitemap();
    // Send it to the browser
    res.send(xmlFile);
  })();
};

const dateFormat = date => {
  return date.format('YYYY-MM-DD');
};

const query = `query {
  shows: allShows {
    slug,
    updatedAt,
  },
  posts: allPosts {
    slug,
    updatedAt,
  }
}`;

const domain = 'https://radiorevolt.no';

const createSitemap = async () => {
  let xml = '';
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  const data = await fetch(`${domain}/graphql?query=${query}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(error => {
      console.error(error.message, error.name);
    });

  const getLatestUpdate = items => {
    let latestUpdate = moment(items[0].updatedAt);
    items.forEach(item => {
      const updatedAt = moment(item.updatedAt);
      if (updatedAt.isAfter(latestUpdate)) {
        latestUpdate = updatedAt;
      }
    });
    return latestUpdate;
  };

  [
    {
      loc: '/',
      lastmod: dateFormat(getLatestUpdate(data.posts)),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: '/programmer',
      lastmod: dateFormat(getLatestUpdate(data.shows)),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: '/sendeplan',
      lastmod: dateFormat(moment()),
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: '/om',
      lastmod: '2018-10-18',
      changefreq: 'yearly',
      priority: 0.6,
    },
    {
      loc: '/personvern',
      lastmod: '2018-10-18',
      changefreq: 'yearly',
      priority: 0.3,
    },
  ].forEach(site => {
    xml += '<url>';
    xml += `  <loc>${domain}${site.loc}</loc>`;
    xml += `  <lastmod>${site.lastmod}</lastmod>`;
    xml += `  <changefreq>${site.changefreq}</changefreq>`;
    xml += `  <priority>${site.priority}</priority>`;
    xml += '</url>';
  });

  const addSite = content => {
    xml += '<url>';
    xml += `  <loc>${domain}/programmer/${content.slug}</loc>`;
    xml += `  <lastmod>${dateFormat(moment(content.updatedAt))}</lastmod>`;
    xml += '  <changefreq>weekly</changefreq>';
    //xml += '<priority>0.8</priority>' // Default is 0.5
    xml += '</url>';
  };

  data.shows.forEach(addSite);
  data.posts.forEach(addSite);

  xml += '</urlset>';
  return xml;
};
