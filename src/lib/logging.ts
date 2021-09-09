import ecsFormat from '@elastic/ecs-winston-format';
import winston from 'winston';

export const logger = winston.createLogger({
  format: ecsFormat(),
  transports: [new winston.transports.Console()],
});
