const express = require('express')
const { userController } = require('../controllers')
const validUser = require('../validations').userValidator

const users = express.Router()

users.post('/', validUser, userController.register)
users.get('/login', userController.login)

module.exports = users
