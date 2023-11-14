import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { RequestContextMiddleware } from "@/common/midleware/request/context.middleware";

@Module({
	providers: [RequestContextMiddleware],
	exports: [RequestContextMiddleware],
})
export class RequestContextModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(RequestContextMiddleware).forRoutes({
			path: "*",
			method: RequestMethod.ALL,
		});
	}
}
