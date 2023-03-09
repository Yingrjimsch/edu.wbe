const https = require('https');

https.get(`https://wttr.in/${process.argv[2]}?format=j1`, (resp) => {
  let data = '';
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(JSON.parse(data).current_condition[0].temp_C + '°');
  });
});
