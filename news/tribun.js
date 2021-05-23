const axios = require('axios');
const cheerio = require('cheerio');

const getPageTribun = async () => {
  try {
    const { data } = await axios.get('https://www.tribunnews.com/corona');
    const tribun = [];

    const $ = cheerio.load(data);
    $('.art-list').each((i, el) => {
      if (i < 10) {
        const box = $(el);
        const anchor = box.find('a');
        const link = anchor.attr('href');
        const image = box.find('img').attr('src');
        const title = anchor.attr('title');
        const data = {
          title,
          link,
          image,
          source: 'tribun',
        };
        tribun.push(data);
      } else {
        return;
      }
    });
    return tribun;
  } catch (error) {
    console.log(error);
    return [
      {
        title: 'Error',
        link: 'Error',
        image: 'Error',
        source: 'tribun',
      },
    ];
  }
};

module.exports = getPageTribun;
