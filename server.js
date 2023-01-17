const express = require('express')
const app = require('./src/app')

const portServer = 3000

app.use(express.json())

// Default message
app.get('*', (request, response) => response.status(200).json({
	message: "Wellcome to Rest Web Service",
}));

//Run Server
app.listen(portServer, () => {
  console.log(`Server working in port ${portServer}`)
})
