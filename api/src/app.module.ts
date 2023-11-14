import { HttpErrorFilter } from "@/common/filter/http-error.filter";
import appConfig from "@/config/app.config";
import dbConfig from "@/config/db.config";
import loggerConfig from "@/config/logger.config";
import { TypeOrmConfigService } from "@/db/typeorm-config.service";
import { LoggerModule } from "@/logger/logger.module";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { RequestContextModule } from "@/common/midleware/request/context.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
			load: [appConfig, dbConfig, loggerConfig],
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService,
			dataSourceFactory: async (options: DataSourceOptions) => {
				return new DataSource(options).initialize();
			},
		}),
		RequestContextModule,
		LoggerModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule {}
