// class example.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const data = {};
data.kenji = 'senhadokenji';

app.get('/', (req, res) => {
  const ret = `
        <html>
            <form action="/" method="POST">
                <label>Username: </label>
                <input type="text" name="username" />
                <label>Password: </label>
                <input type="password" name="password" />
                <input type="hidden" name="id" value="1234" />
                <input type="submit" value="Entrar" />
            </form>
        </html>
    `;
  res.send(ret);
});

app.post('/', (req, res) => {
  const {username} = req.body;
  const {password} = req.body;
  const ret = {};

  ret.token = new Date().getTime() + username;

  res.setHeader('Content-Type', 'application/json');

  const result = `
        < html >
            <label>Seja bem-vindo ${username}</label>
            <form action="/" method="POST">
                <input type="text" name="action" />
                <input type="hidden" name="session-id" value="${ret.token}" />
                <input type="submit" value="Agir" />
            </form>    
        </html >
        `;

  if (password === data[username]) {
    res.send(result);
    return false;
  }
  res.redirect('/');
  return false;
});

app.listen(8080);
