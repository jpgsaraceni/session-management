const obj = [{ id: 1, username: 'test', password: 'test' }, { id: 2, username: 'admin', password: 'admin' }, { username: 'd', password: '$2b$10$hfgAGGX.QYiFQf1MW0vHN.qiXNKzxgWqN4PmRA3B3.xLi9gpho9jG' }]
const username = 'test'

console.log(obj.find(element => element.username === username).password)
