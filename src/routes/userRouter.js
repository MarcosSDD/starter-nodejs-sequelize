const express = require('express')
const { userController } = require('../controllers')
const { validUser } = require('../validations').userValidator

const users = express.Router()

users.post('/', validUser, userController.register)
users.get('/', userController.allUsers)
users.get('/:id', userController.profile)
users.put('/:id', userController.update)
users.delete('/:id', userController.delete)

users.post('/login', userController.login)

module.exports = users
