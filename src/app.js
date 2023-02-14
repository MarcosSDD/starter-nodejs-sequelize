const express = require('express')
const logger = require('../logger')
const dotenv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger.json')
const router = require('./routes')

dotenv.config()

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
}

const app = express()

app.use(express.json())

const allowedDomains = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if(!origin){//for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

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
