const axios = require('axios');
const cheerio = require('cheerio');

const getIndStat = async () => {
  try {
    const { data } = await axios.get('https://www.worldometers.info/coronavirus/country/indonesia/');

    const stats = {};

    const $ = cheerio.load(data);
    $('#maincounter-wrap').each((i, el) => {
      const count = parseInt($(el).find('span').text().replaceAll(',', ''));
      if (i === 0) {
        stats.cases = count;
      } else if (i === 1) {
        stats.deaths = count;
      } else if (i === 2) {
        stats.recovers = count;
      }
    });
    return stats;
  } catch (error) {
    console.log(error);
    return {
      cases: 'Error',
      deaths: 'Error',
      recovers: 'Error',
    };
  }
};

module.exports = getIndStat;
