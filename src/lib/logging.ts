import ecsFormat from '@elastic/ecs-winston-format';
import winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: 'combined.log',
      format: ecsFormat({ convertReqRes: true }),
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.simple(),
    }),
  ],
});
