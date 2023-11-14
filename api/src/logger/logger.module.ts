import { LoggerController } from "@/logger/logger.controller";
import { LoggerService } from "@/logger/logger.service";
import { Module } from "@nestjs/common";

@Module({
	controllers: [LoggerController],
	providers: [LoggerService],
	imports: [],
})
export class LoggerModule {}
