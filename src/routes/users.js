const express = require('express')

const users = express.Router()

users.get("/", (require,response)=>{
    response.send("Hola")
})

module.exports = users