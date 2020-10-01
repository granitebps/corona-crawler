const fs = require('fs');
const moment = require('moment');

moment.locale('id');

const detikNews = require('./news/detik');
const tribunNews = require('./news/tribun');
const cnnNews = require('./news/cnn');

const IndonesiaStats = require('./statistics/indonesia');

const getNews = async () => {
  const detik = await detikNews();
  const tribun = await tribunNews();
  const cnn = await cnnNews();

  const indStats = await IndonesiaStats();

  const data = {
    crawled_at: moment(),
    stats: {
      ID: indStats,
    },
    news_source: [
      {
        name: 'detik',
        url: 'https://www.detik.com/tag/corona',
      },
      {
        name: 'tribun',
        url: 'https://www.tribunnews.com/corona',
      },
      {
        name: 'cnn',
        url: 'https://www.cnnindonesia.com/tag/corona',
      },
    ],
    news: [...detik, ...tribun, ...cnn],
  };

  const json = JSON.stringify(data);
  fs.writeFile('news.json', json, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
};

module.exports = getNews;
