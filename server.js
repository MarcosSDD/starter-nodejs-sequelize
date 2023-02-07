const { app, logger } = require('./src/app')

const portServer = process.env.APP_PORT || 3000

// Default message
app.get('*', (request, response) =>
  response.status(200).json({
    message: 'Welcome to Rest Web Service',
  })
)

//Run Server
const server = app.listen(portServer, () => {
  logger.info(`Server working in port ${portServer}`)
})

module.exports = server