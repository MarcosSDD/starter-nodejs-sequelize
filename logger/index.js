const { format, createLogger, transports } = require('winston')
const { combine, timestamp, label, printf } = format
require('winston-daily-rotate-file')

const CATEGORY = 'Rest Web Service'

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'log/rest-service-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
})

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    customFormat
  ),
  transports: [fileRotateTransport, new transports.Console()],
})

module.exports = logger
