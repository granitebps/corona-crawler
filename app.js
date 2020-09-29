const express = require('express');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const getNews = require('./crawler');

console.log('Before job instantiation');
const job = new CronJob({
  cronTime: '0 * * * *',
  onTick: async function () {
    console.log('Crawled at : ' + moment().format('DD-MM-YYYY, HH:mm'));
    await getNews();
  },
  runOnInit: true,
});
console.log('After job instantiation');
job.start();

const app = express();

app.get('/', async (req, res) => {
  const rawdata = fs.readFileSync('news.json');
  const data = JSON.parse(rawdata);
  res.json(data);
});

const PORT = process.env.PORT || 5000;
try {
  console.log(`Server started at port ${PORT}`);
  app.listen(PORT, () => {});
} catch (error) {
  console.log(error);
  process.exit(1);
}
