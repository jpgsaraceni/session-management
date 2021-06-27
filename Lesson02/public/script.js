/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
const baseUrl = 'http://localhost'
let user

function changeToPage (id) {
  document.querySelectorAll('.container').forEach(element => element.style.display = 'none')
  document.getElementById(`${id}-container`).style.display = 'flex'
}

function login () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const reqObj = { username: username, password: password }

  fetch(baseUrl + '/login', { method: 'POST', body: JSON.stringify(reqObj), headers: { 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data === true) {
        changeToPage('home')
        user = username
        document.getElementById('logged-username').innerHTML = username
      }
    })
    .catch(err => console.log(err))
}

function openSchedule () {
  fetch(baseUrl + '/schedule')
    .then(response => response.json())
    .then(data => {
      if (data === true) {
        changeToPage('schedule-class')
      }
      if (data === false) {
        changeToPage('login')
        document.getElementById('login-welcome').innerHTML = 'Acesso negado. Faça o login novamente e habilite os cookies para esse site.'
        document.getElementById('login-welcome').style.color = 'red'
      }
    })
    .catch(err => console.log(err))
}

function register () {
  const username = document.getElementById('username-new').value
  const password = document.getElementById('password-new').value
  const confirmPassword = document.getElementById('confirm-password-new').value

  if (password === confirmPassword) {
    console.log('here')
    const userObj = { username: username, password: password }
    fetch(baseUrl + '/register', { method: 'POST', body: JSON.stringify(userObj), headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(data => {
        if (data === true) {
          changeToPage('login')
          document.getElementById('register-complete').innerHTML = 'Cadastro feito com sucesso! Faça o login para prosseguir.'
        }
      })
      .catch(err => console.log(err))
  }
}
