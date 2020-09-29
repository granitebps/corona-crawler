const axios = require('axios');
const cheerio = require('cheerio');

const getPageCnn = async () => {
  const { data } = await axios.get('https://www.cnnindonesia.com/tag/corona');
  const cnn = [];

  const $ = cheerio.load(data);
  $('.l_content')
    .find('article')
    .each((i, el) => {
      if (i < 10) {
        const box = $(el).children('a');
        const link = box.attr('href');
        const image = box.find('img').attr('src');
        const title = box.find('h2').text();
        const data = {
          title,
          link,
          image,
          source: 'cnn',
        };
        cnn.push(data);
      } else {
        return;
      }
    });
  return cnn;
};

module.exports = getPageCnn;
