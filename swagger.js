const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.3' })

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']
const basicInformation = {
  info: {
    version: '1.0.0',
    title: 'User API - NodeJS - Sequelize',
    description: 'Web Services Documentation : This is a sample ',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'marcos.saldivia@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api/',
    },
  ],
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints for User',
    },
  ],
  definitions: {
    User: {
      name: 'Jhon',
      surname: 'Doe',
      email: 'jhon.doe@gg.com',
      password: '12345678',
    },
    newUser: {
      name: 'Jhon',
      surname: 'Doe',
    },
  },
}
swaggerAutogen(outputFile, endpointsFiles, basicInformation)
