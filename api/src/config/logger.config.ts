import { Environment } from '@/config/app.config';
import { registerAs } from '@nestjs/config';

export type LoggerConfig = {
  level: 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error';
  defaultContext: string;
  dbContext: string;
  httpResolveLog: boolean;
  defaultUserMask: string;
  fileName: string;
  auditFile?: string;
  datePattern: string;
  zippedArchive: boolean;
  maxSize: string;
  maxFiles: string;
  format: string;
  dirname: string;
};

export const loggerConfig: LoggerConfig = {
  level: process.env.NODE_ENV === Environment.Production ? 'info' : 'silly',
  defaultContext: 'CORE',
  dbContext: 'ORM',
  httpResolveLog: true,
  defaultUserMask: 'UNKNOWN',
  dirname: './logs',
  fileName: '%DATE%.log',
  auditFile: './logs/audit.json',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '5m',
  maxFiles: '9d',
  format: 'DD.MM.YYYY HH:mm:ss',
};

export default registerAs<LoggerConfig>('logger', () => {
  return loggerConfig;
});
