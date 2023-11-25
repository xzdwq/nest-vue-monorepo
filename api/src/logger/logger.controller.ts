import { LoggerDto } from '@/logger/dto/logger.dto';
import { LoggerService } from '@/logger/logger.service';
import { Body, Controller, Get, Post, Version } from '@nestjs/common';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  @Version('1')
  writeLog(@Body() data: LoggerDto): void {
    this.loggerService.writeLog(data);
  }

  @Get()
  @Version('1')
  showLogs(): Promise<unknown> {
    return this.loggerService.showLogs();
  }
}
