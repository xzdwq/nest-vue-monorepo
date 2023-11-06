import { loggerConfig } from '@/config/logger.config';
import { Logger } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const preapareLog = ((entry: any, defaultContext: string) => {
  const splat = entry[Symbol.for('splat')];
  if (splat) {
    entry.source = Array.isArray(splat) ? splat[0] : splat?.toString();
  } else {
    entry.source = null;
  }
  entry.context = entry?.message?.context || defaultContext;

  let message = entry.message;
  if (typeof message === 'object') message = `DATA-STRINGIFY: ${JSON.stringify(message)}`;

  try {
    Logger[entry.level](message, entry.context);
  } catch (e: unknown) {
    Logger.log(message, entry.context);
  };

  return entry;
}); 

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
        json: true,
        format: winston.format.combine(
          winston.format(preapareLog)(defaultContext),
          winston.format.errors({ stack: true }),
          winston.format.timestamp({
            format: loggerConfig.format
          }),
          winston.format.ms(),
          winston.format.json({ space: 2, maximumDepth: 2 }),
        ),
      }),
    ]
  }
}

export const loggerDb = winston.createLogger(winstonOptions(loggerConfig.dbContext));

export default winston.createLogger(winstonOptions(loggerConfig.defaultContext)); 