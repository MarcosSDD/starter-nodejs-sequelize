const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.3' })

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routes/index.js']
const basicInformation = {
  info: {
    version: '1.0.0',
    title: 'Init Project API - NodeJS - Sequelize',
    description: 'Web Services Documentation : This is a starter project for quickly building REST APIs in Node.js using Express and Sequelize ORM ',
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
      id:'xxxxxxxxx',
      name: 'Jhon',
      surname: 'Doe',
      email: "jhon.doe@gg.com",
      createdAt: "2023-02-13T21:11:43.381Z",
      updatedAt: "2023-02-13T21:11:43.381Z",
      success: true
    },
    resLoginUser: {
      id: 'xxxxxxxxx',
      name: 'Jhon',
      surname: 'Doe',
    },
    loginUser:{
      email: 'jhon.doe@gg.com',
      password: '12345678',
    },
    mailUser:{
      email: 'jhon.doe@gg.com',
    },
    arrayUsers: [ { $ref: "#/definitions/newUser" } ] ,

  },
}
swaggerAutogen(outputFile, endpointsFiles, basicInformation)
