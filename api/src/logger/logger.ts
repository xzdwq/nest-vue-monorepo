import { loggerConfig } from '@/config/logger.config';
import { Logger } from '@nestjs/common';
import { SPLAT } from 'triple-beam';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const winstonOptions = (defaultContext: string): winston.LoggerOptions => {
  return {
    level: loggerConfig.level,
    transports: [
      new DailyRotateFile({
        filename: loggerConfig.fileName,
        datePattern: loggerConfig.datePattern,
        zippedArchive: loggerConfig.zippedArchive,
        maxSize: loggerConfig.maxSize,
        maxFiles: loggerConfig.maxFiles,
        auditFile: loggerConfig.auditFile,
        dirname: loggerConfig.dirname,
        format: winston.format.combine(
          winston.format.simple(),
          winston.format.errors({ stack: true }),
          winston.format.metadata(),
          winston.format.timestamp({
            format: loggerConfig.format
          }),
          winston.format.ms(),
          winston.format.printf(({ timestamp, ms, level, message, ...metadata }) => {
            const context = `${metadata[SPLAT] || defaultContext}`;

            if (typeof message === 'object') message = `DATA-STRINGIFY: ${JSON.stringify(message)}`;

            try {
              Logger[level](message, context);
            } catch (e: unknown) {
              Logger.log(message, context);
            };

            return `${timestamp} ${ms} ${level.toUpperCase()} [${context}] ${message}`;
          }),
        ),
      }),
    ]
  }
}

export const loggerDb = winston.createLogger(winstonOptions(loggerConfig.dbContext));

export default winston.createLogger(winstonOptions(loggerConfig.defaultContext)); 