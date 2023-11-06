import { loggerConfig } from '@/config/logger.config';
import logger from '@/logger/logger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(
    exception: HttpException,
    host: ArgumentsHost,
  ): Response<any, Record<string, any>> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request | any>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      typeof exception.getResponse === 'function'
        ? exception.getResponse()['message']
        : exception.message || exception.getResponse();

    const errorResponse = {
      success: false,
      code: status,
      error:
        typeof exception.getResponse === 'function'
          ? exception.getResponse()['error'] || 'Error'
          : exception.message,
      timestamp: new Date().toLocaleTimeString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }),
      path: request.url,
      method: request.method,
      message: message,
    };
    const user = request.user?.email || loggerConfig.defaultUserMask;
    logger.error(
      `[${user}] ${request.method} ${request.url} ${status} - ${message}`,
      HttpErrorFilter.name,
    );

    response.status(status).json(errorResponse);
    return;
  }
}
