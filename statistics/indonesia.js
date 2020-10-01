const axios = require('axios');
const cheerio = require('cheerio');

const getIndStat = async () => {
  const { data } = await axios.get(
    'https://www.worldometers.info/coronavirus/country/indonesia/'
  );

  const stats = {};

  const $ = cheerio.load(data);
  $('#maincounter-wrap').each((i, el) => {
    const count = parseInt($(el).find('span').text().replace(',', ''));
    if (i === 0) {
      stats.cases = count;
    } else if (i === 1) {
      stats.deaths = count;
    } else {
      stats.recovers = count;
    }
  });
  return stats;
};

module.exports = getIndStat;
