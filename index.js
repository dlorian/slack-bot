require('dotenv').config()

const http = require('http');
const port = process.env.PORT || 3000;

const { WebClient } = require('@slack/client');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const postMessage = (sender, recipient, message) => {
  // The RTM client can send simple string messages

  web.chat.postMessage({
    channel: recipient.id,
    text: `<@${sender.id}|${sender.name}> wants to greet you. Here is what he sent:\n>${message}`
  })
    .then(res => {
      console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
};

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
  const match = regexp.exec(req.body.text);
  const sender = {
    id: req.body.user_id,
    name: req.body.user_name
  };
  
  if (match.length === 3) {
    const user = match[1];
    const message = match[2];

    const list = web.im.list()
      .then(res => {
        const recipient = res.ims.find(el => user.indexOf(el.user) !== -1);
        postMessage(sender, recipient, message);
      })
      .catch(console.err);
  }
});

const server = app.listen(port, () => {
  console.log('Express server listening on port %d', port);
});
