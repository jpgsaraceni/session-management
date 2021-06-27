/* eslint-disable no-unused-vars */
/* eslint-disable node/no-path-concat */
const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

const fakeDb = 'fakedb/users.json'
let sessionToken // change to object

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

const userList = new Promise((resolve, reject) => {
  fs.readFile(fakeDb, (err, data) => {
    if (err) {
      reject(err)
    }
    resolve(JSON.parse(data))
  })
})

app.use('/', express.static('public'))

app.post('/login', async (req, res) => {
  const { username } = req.body
  const { password } = req.body
  let validation = false

  await userList.then(data => {
    data.forEach(user => {
      if (user.username === username & user.password === password) {
        const token = `${new Date().getTime()}:${username}`
        res.cookie('token', token)
        sessionToken = token
        validation = true
      }
    })
  }).then(() => { if (validation) res.send('true') })
    .catch(err => console.log(err))

  if (!validation) res.redirect('/')
})

app.get('/schedule', (req, res) => {
  if (req.cookies.token === sessionToken) {
    res.send('true')
  } else {
    res.send('false') // change to res.status(403).send('Não autorizado')
  }
})

app.post('/register', async (req, res) => {
  const { username } = req.body
  const { password } = req.body
  const userObj = { username: username, password: password }

  await registerUser(userObj).then(data => {
    res.send('true')
  }).catch(() => res.send('false'))
})

app.post('/schedule', (req, res) => { // in progress
  if (req.cookies.token === sessionToken) {
    res.send('true')
  }
})

app.listen(80)
