import { Environment } from '@/config/app.config';
import { registerAs } from '@nestjs/config';

export type LoggerConfig = {
  level: ('silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error');
  defaultContext: string;
  dbContext: string;
  httpResolveLog: boolean;
  defaultUserMask: string;
  morganFormat: string;
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
  morganFormat: '[:user] v:http-version :remote-addr - [:remote-user] :referrer - :method :url :status, res-time: :response-time ms. ":user-agent"',
  dirname: './logs',
  fileName: '.%DATE%.log',
  auditFile: './logs/audit.json',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '4m',
  maxFiles: '7d',
  format: 'DD.MM.YYYY HH:mm:ss',
};

export default registerAs<LoggerConfig>('logger', () => {

  return loggerConfig;
});
