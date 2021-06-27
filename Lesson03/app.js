const express = require('express')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const fs = require('fs')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

const fakeDb = 'fakedb/users.json'
const tokens = {}

function registerUser (newUser) {
  return new Promise((resolve, reject) => {
    fs.readFile(fakeDb, (err, data) => {
      if (err) throw err

      const receivedJSON = JSON.parse(data)
      receivedJSON.push(newUser)

      const updatedJSON = JSON.stringify(receivedJSON)

      const stringJSON = new Uint8Array(Buffer.from(updatedJSON))

      fs.writeFile(fakeDb, stringJSON, (err) => {
        if (err) {
          reject(err)
        }
        resolve(JSON.parse(data))
      })
    })
  })
}

function userList () {
  return new Promise((resolve, reject) => {
    fs.readFile(fakeDb, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
}

app.use('/', express.static('public'))

app.post('/login', async (req, res) => {
  const { username } = req.body
  const { password } = req.body

  await userList().then(data => {
    const userPassword = data.find(element => element.username === username).password
    console.log(password)
    console.log(userPassword)

    bcrypt.compare(password, userPassword).then((result) => {
      if (result) {
        const token = crypto
          .createHash('sha256')
          .update(`${new Date().getTime()}:${username}`)
          .digest('hex')

        tokens[username] = token
        res.cookie('token', token)
        res.send('true')
      } else {
        res.send('false')
      }
    }).catch(err => {
      console.log(err)
      res.send('false') // refactor this
    })
  }).catch(err => console.log(err))
})

app.get('/schedule', (req, res) => {
  if (req.cookies.token === tokens[req.headers.username]) {
    res.send('true')
  } else {
    res.status(403).send('token inválido')
  }
})

app.post('/register', async (req, res) => {
  const { username } = req.body
  const { password: receivedPassword } = req.body
  const userObj = { username: username }

  bcrypt.hash(receivedPassword, 10, async (err, hash) => {
    if (err) throw err
    userObj.password = hash

    await registerUser(userObj).then(data => {
      res.send('true')
    }).catch(() => res.send('false'))
  })
})

app.post('/schedule', (req, res) => { // in progress
  if (req.cookies.token === tokens[req.headers.username]) {
    res.send('true')
  }
})

app.listen(80)
