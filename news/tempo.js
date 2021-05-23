const axios = require('axios');
const cheerio = require('cheerio');

const crawlTempo = (element) => {
  const lists = [];

  const $ = cheerio.load(element);
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
      lists.push(data);
    } else {
      return;
    }
  });
  return lists;
};

const getPageTempo = async () => {
  try {
    const { data: dataCovid19 } = await axios.get('https://www.tempo.co/tag/covid-19');
    const { data: dataCorona } = await axios.get('https://www.tempo.co/tag/corona');

    const tempoCovid19 = crawlTempo(dataCovid19);
    const tempoCorona = crawlTempo(dataCorona);
    return [...tempoCovid19, ...tempoCorona];
  } catch (error) {
    console.log(error);
    return {
      title: 'Error',
      link: 'Error',
      image: 'Error',
      source: 'tempo',
    };
  }
};

module.exports = getPageTempo;
