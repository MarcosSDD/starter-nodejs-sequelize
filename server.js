const express = require('express')
const app = require('./src/app')

const portServer = 3000

app.use(express.json())

//Run Server
app.listen(portServer, () => {
  console.log(`Server working in port ${portServer}`)
})
