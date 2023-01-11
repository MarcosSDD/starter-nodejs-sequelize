const express = require('express')
const userController = require('../controllers/users')
const users = express.Router()

users.get('/profile', userController.profile)
users.get('/login', userController.login)

module.exports = users
