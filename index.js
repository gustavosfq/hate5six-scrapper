const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://hate5six.com/php/queue.php';
const band = 'N.M.A';

rp(url)
  .then(function(html){
    const $ = cheerio.load(html);
    const bandScore = Array.from($('tr')).reduce((all, tr) => {
        if(parseInt(tr.children[7].childNodes[0].data))
            all.push([tr.children[1].childNodes[0].data, parseInt(tr.children[7].childNodes[0].data)])
        return all;
    }, []).sort((a, b) => b[1] - a[1]);
    const [highScoreBandName, highScore] = bandScore[0];
    const [yourBand, yourBandScore] = bandScore.find(i => i[0] === band);
    console.log(`First band : ${highScoreBandName}, Score: ${highScore}`);
    console.log(`Your band : ${yourBand}, Score: ${yourBandScore}`);
    console.log(`Difference with first place is : ${highScore - yourBandScore}`);
  })
  .catch(function(err){
    //handle error
    console.log('x.x', err);
  });

  