import { LoggerDto } from '@/logger/dto/logger.dto';
import logger from '@/logger/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  public async writeLog(data: LoggerDto): Promise<void> {
    logger[data?.level || 'info'](data, LoggerService.name);
    // console.log(logger.transports[0])
    const r = new Promise((resolve, reject) => {
      logger.query({
        start: 0,
        limit: 10,
        fields: ['level']
      }, (error, logs) => {
        if (error) {
          return reject(error);
        }
  
        resolve(logs);
      });
    });
    r.then((d) => {
      console.log(d)
    })
  }
}
