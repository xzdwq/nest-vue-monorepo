import { LoggerDto } from '@/logger/dto/logger.dto';
import { LoggerService } from '@/logger/logger.service';
import { Body, Controller, Get, Post, Request, Version } from '@nestjs/common';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  @Version('1')
  writeLog(@Body() data: LoggerDto): Promise<void> {
    return this.loggerService.writeLog(data);
  }

  @Get()
  @Version('1')
  readLog(@Request() request: any): string {
    request.user = { email: 'test@mail.com' }
    return request.user.email
  }
}
