const { app, logger } = require('./src/app')

const portServer = process.env.APP_PORT || 3000

//Run Server
const server = app.listen(portServer, () => {
  logger.info(`Server working in port ${portServer}`)
})

module.exports = server
