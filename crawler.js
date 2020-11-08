const fs = require('fs');
const moment = require('moment');

moment.locale('id');

const detikNews = require('./news/detik');
const tribunNews = require('./news/tribun');
const cnnNews = require('./news/cnn');
const tempoNews = require('./news/tempo');

const IndonesiaStats = require('./statistics/indonesia');

const getNews = async () => {
  const detik = await detikNews();
  const tribun = await tribunNews();
  const cnn = await cnnNews();
  const tempo = await tempoNews();

  const indStats = await IndonesiaStats();

  const data = {
    crawled_at: moment().format(),
    stats: {
      ID: indStats,
    },
    news: {
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
        {
          name: 'tempo',
          url: 'https://www.tempo.co/tag/covid-19',
        },
      ],
      data: [...detik, ...tribun, ...cnn, ...tempo],
    },
  };

  const json = JSON.stringify(data);
  fs.writeFile('corona.json', json, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
};

module.exports = getNews;
