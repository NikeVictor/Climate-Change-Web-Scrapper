const express = require('express');
const axios = require ('axios')
const cheerio = require ('cheerio')
const app = express();

const PORT = process.env.port || 3000;

const website = 'https://www.theguardian.com/environment/climate-crisis';

try {
  axios.get(website)
  .then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);

    let content = [];

    $('a:contains("climate")', data).each(function () {
      const title = $(this).text();
      const url = $(this).attr('href');

      content.push({
        title,
        url,
      });
      //console.log (content)

      app.get('/', (req, res) => {
        res.send(content);
      });
    });
  });
} catch (error) {
  console.log(error, error.message);
}


app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});