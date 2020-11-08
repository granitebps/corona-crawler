const axios = require('axios');
const cheerio = require('cheerio');

const getPageTempo = async () => {
  const { data } = await axios.get('https://www.tempo.co/tag/covid-19');
  const tempo = [];

  const $ = cheerio.load(data);
  const articleCol = $('#article').children('.col')[0];
  const list = $(articleCol).find('ul');
  list.children('li').each((i, el) => {
    if (i < 10) {
      const wrapper = $(el).find('.wrapper');
      const image = wrapper.find('img').attr('src');
      const link = wrapper.children('a').attr('href');
      const title = wrapper.find('.title').text();
      const data = {
        title,
        link,
        image,
        source: 'tempo',
      };
      tempo.push(data);
    } else {
      return;
    }
  });
  return tempo;
};

module.exports = getPageTempo;
