const { createLogger, format, transports, info } = require('winston');

const logger = createLogger({
    level: 'info',  // default log level
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new transports.Console(),  // log to console
        new transports.File({ filename: 'logs/app.log' }),  // log to file
        new transports.File({ filename: 'logs/error.log', level: 'error' }),  // log errors to a separate file
        new transports.File({ filename: 'logs/combined.log' }),  // log all messages to a combined file
    ],
});

module.exports = logger;