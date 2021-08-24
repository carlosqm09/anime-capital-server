const {File} = require('megajs');


const file = File.fromURL('https://mega.nz/file/zLpAXA5C#R7veQ5nMPWmvgHaYZeejtGFijNa1yCQACuzPu654P_Y');

file.loadAttributes((error, file) => {
    console.log(file.name) // file name
    console.log(file.size) // file size in bytes
  
    file.download((err, data) => {
      if (err) throw err
      const buff = Buffer.from(data.toString());
      console.log(buff.buffer.byteLength) // file contents
    })
  })

/* const { default: axios } = require('axios');
const cheerio = require('cheerio');

axios.get('https://tioanime.com/ver/mairimashita-irumakun-2nd-season-19')
.then(r => {
    const $ = cheerio.load(r.data);

    const a = $('a.btn.btn-success.btn-download.btn-sm.rounded-pill');

    console.log(a.attr('href'));
}) */