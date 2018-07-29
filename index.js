const http = require('http');

const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// You must use a body parser for JSON before mounting the adapter
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/greetings', (req, res) => {
  let text = req.body.text;

  res.send("Received it");
});

const server = app.listen(port, () => {
    console.log('Express server listening on port %d', port);
});
