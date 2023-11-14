import { LoggerDto } from "@/logger/dto/logger.dto";
import { LoggerService } from "@/logger/logger.service";
import { Body, Controller, Get, Post, Request, Version } from "@nestjs/common";

@Controller("logger")
export class LoggerController {
	constructor(private readonly loggerService: LoggerService) {}

	@Post()
	@Version("1")
	writeLog(@Body() data: LoggerDto): void {
		this.loggerService.writeLog(data);
	}

	@Get()
	@Version("1")
	showLogs(@Request() request: any): Promise<unknown> {
		return this.loggerService.showLogs();
	}
}
