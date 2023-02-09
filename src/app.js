const express = require('express')
const logger = require('../logger')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger.json')
const router = require('./routes')

dotenv.config()

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
}

const app = express()

app.use(express.json())

app.use('/api/', router)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options))

// Default message
app.get('*', (request, response) =>
  response.status(200).json({
    message: 'Welcome to Rest Web Service',
  })
)

module.exports = {
  app,
  logger,
}
