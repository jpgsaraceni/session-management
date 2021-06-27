const express = require('express');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const data = {user: 'password'};

app.use('/', express.static('login'));

app.post('/', (req, res) => {
  const {username} = req.body; // value of the "username" key from req.body (destructuring assignment)
  const {password} = req.body; // value of the "password" key from req.body (destructuring assignment)
  const ret = {}; // object that will be sent as response

  ret.token = new Date().getTime() + username; // unique token

  res.setHeader('Content-Type', 'text/html');

  const result = `
    <head>
      <link rel="stylesheet" href="style.css">
    </head>
    <div class="container">
      <h1>Seja bem-vindo ${username}</h1>
      <form action="/token" method="POST">
        <input type="hidden" name="token" value="${ret.token}" />
        <input type="submit" value="Exibir token" class="primary-btn"/>
      </form>
    </div>
  `;

  if (password === data[username]) {
    res.send(result);
    res.sendFile(__dirname + '/login/style.css');
    return false;
  }
  res.redirect('/');
  return false;
});

app.post('/token', (req, res) => {
  const {token} = req.body;

  const ret = `
    <head>
      <link rel="stylesheet" href="style.css">
    </head>
    <div class="container">
      <h1>Seu token é ${token}</h1>    
    </div>
  `;
  res.send(ret);
  res.sendFile(__dirname + '/login/style.css');
});

app.use('/signup', express.static('signup'));

app.post('/signup', (req, res) => {
  const {username} = req.body;
  const {password} = req.body;
  data[`${username}`] = password;

  res.setHeader('Content-Type', 'text/html');

  const result = `
    <head>
      <link rel="stylesheet" href="style.css">
    </head>
    <div class="container">
      <form action="/" method="POST">
        <h1>Cadastro efetuado!</h1>
        <input type="hidden" name="username" value=${username} />
        <input type="hidden" name="password" value=${password} />
        <input type="submit" value="Entrar" class="primary-btn"/>
      </form>
    </div>
  `;

  res.send(result);
  res.sendFile(__dirname + '/login/style.css');
});

app.listen(80);
