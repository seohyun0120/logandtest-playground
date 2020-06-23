import winston, { format } from 'winston';
const { label, combine, colorize, printf, timestamp } = format;

const logger = winston.createLogger({
  format: combine(
    colorize({ level: true }),
    label({ label: 'EXPRESS_PLAYGROUND' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(info => `${info.timestamp}_${info.level}__[${info.label}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({ level: 'silly' }),
    new winston.transports.File({
      level: 'debug',
      filename: 'debug.log',
      dirname: process.cwd() + '/log'
    })
  ]
});

const httpLogStream = {
  write: (message: string) => {
    logger.http(message);
  },
};

export { logger, httpLogStream };