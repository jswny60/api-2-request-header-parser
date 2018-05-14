import express = require('express');

interface ParsedResult {
  ipaddress: string;
  language: string;
  software: string;
}


function parseHeaders(req: express.Request): ParsedResult {
  return {
    ipaddress: req.ip,
    language: req.get('Accept-Language'),
    software: req.get('User-Agent').split('(')[1].split(')')[0],
  }
}

const app = express();

app.get('/api/whoami/', (req, res) => {
  const result = parseHeaders(req);
  res.send(result);
});

app.listen(process.env.PORT, () =>
  console.log(`Running on http://localhost:${process.env.PORT}/`));

