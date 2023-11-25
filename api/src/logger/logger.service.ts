import { LoggerDto } from '@/logger/dto/logger.dto';
import logger from '@/logger/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  public writeLog(data: LoggerDto): void {
    logger[data?.level || 'info'](data, LoggerService.name);
  }

  public async showLogs(): Promise<unknown> {
    const start = 0;
    const limit = 50;

    const logs: { dailyRotateFile: any[] } = await new Promise(
      (resolve, reject) => {
        logger.query(
          {
            start,
            limit,
            order: 'desc',
            fields: [
              'context',
              'level',
              'message',
              'ms',
              'source',
              'timestamp',
            ],
          },
          (error, logs) => {
            if (error) reject(error);
            resolve(logs);
          },
        );
      },
    );

    return logs?.dailyRotateFile || [];
  }
}
