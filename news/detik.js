const axios = require('axios');
const cheerio = require('cheerio');

const getPageDetik = async () => {
  try {
    const { data } = await axios.get('https://www.detik.com/tag/corona');
    const detik = [];

    const $ = cheerio.load(data);
    $('article').each((i, el) => {
      if (i < 10) {
        const box = $(el).children('a');
        const link = box.attr('href');
        const image = box.find('img').attr('src');
        box.find('.category').remove();
        const title = box.find('h2').text();
        const data = {
          title,
          link,
          image,
          source: 'detik',
        };
        detik.push(data);
      } else {
        return;
      }
    });
    return detik;
  } catch (error) {
    console.log('Detik Error', error.message);
    return [
      {
        title: 'Error',
        link: 'Error',
        image: 'Error',
        source: 'detik',
      },
    ];
  }
};

module.exports = getPageDetik;
