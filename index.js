const http = require('http');

const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// You must use a body parser for JSON before mounting the adapter
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/greetings', (req, res) => {
  let text = req.body.text;
  res.send("Hello world");
});

app.post('/greetings', (req, res) => {
    // Extract user and text
    const regexp = /(<@.*?>) (.*)$/;
    const match =  regexp.exec(req.body.text);
    console.log(match);

    const user = match[1];
    const text = match[2];
  res.send(`Hello ${user}, ${text}`);
});

const server = app.listen(port, () => {
    console.log('Express server listening on port %d', port);
});
