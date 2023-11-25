import { loggerConfig } from '@/config/logger.config';
import logger from '@/logger/logger';
import * as morgan from 'morgan';

morgan.token('user', (req: any) =>
  req?.user ? req.user.email : loggerConfig.defaultUserMask,
);

export default morgan(
  (tokens: any, req: any, res: any) => {
    return JSON.stringify({
      user: tokens.user(req, res),
      httpVersion: tokens['http-version'](req, res),
      remoteAddr: tokens['remote-addr'](req, res),
      remoteUser: tokens['remote-user'](req, res),
      referrer: tokens.referrer(req, res),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      responseTime: Number.parseFloat(tokens['response-time'](req, res)),
      userAgent: tokens['user-agent'](req, res),
    });
  },
  {
    skip: (req: any, res: any) => res.statusCode >= 400,
    stream: {
      write: (message: string) => {
        const data = JSON.parse(message);
        loggerConfig.httpResolveLog ? logger.http(data) : null;
      },
    },
  },
)
