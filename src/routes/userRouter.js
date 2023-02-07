const express = require('express')
const { userController } = require('../controllers')

const users = express.Router()

users.post('/user', userController.register)
users.get('/user/login', userController.login)

module.exports = users
