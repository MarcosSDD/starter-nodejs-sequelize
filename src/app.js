const express = require('express')
const { users } = require('./routes')
const app = express()

app.use("/api/user",users)

module.exports = app