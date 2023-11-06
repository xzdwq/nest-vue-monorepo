import { AppModule } from '@/app.module';
import validationOptions from '@/common/validate/validation.options';
import { AppConfig } from '@/config/app.config';
import { LoggerConfig } from '@/config/logger.config';
import logger from '@/logger/logger';
import {
	ClassSerializerInterceptor,
	ValidationPipe,
	VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as morgan from 'morgan';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	const configService = app.get(ConfigService);

	const appConfig = configService.getOrThrow<AppConfig>('app', { infer: true });
	const loggerConfig = configService.getOrThrow<LoggerConfig>('logger', { infer: true });

	app.setGlobalPrefix(appConfig.apiPrefix);
	app.enableVersioning({
		defaultVersion: '1',
		type: VersioningType.URI,
	});

	app.enableShutdownHooks();
	app.useGlobalPipes(new ValidationPipe(validationOptions));
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.enableCors({
		origin: [/^(.*)/],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});

  // morgan.format('combined', loggerConfig.morganFormat)
  // app.use(morgan('combined', {
  //   skip: (req: any, res: any) => res.statusCode >= 400,
  //   stream: {
  //     write: (message: string) => {
	// 			loggerConfig.httpResolveLog
	// 				? logger.http(message)
	// 				: null;
	// 		}
  //   }
  // }));
	app.use(morgan((tokens: any, req: any, res: any) => {
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
	}, {
    skip: (req: any, res: any) => res.statusCode >= 400,
    stream: {
      write: (message: string) => {
				const data = JSON.parse(message);
				loggerConfig.httpResolveLog
					? logger.http(data)
					: null;
			}
    }
  }));
	morgan.token('user', (req: any, res: any) => req?.user ? req.user.email : loggerConfig.defaultUserMask);

	await app.listen(appConfig.apiPort, appConfig.apiHost, async () => {
		const appUrl = await app.getUrl();
		logger.info(`🚀 Server NestApi running. Application on url: ${appUrl}`);
		logger.info(`✨ ${appConfig.apiHost}:${appConfig.apiPort} | mode: ${appConfig.nodeEnv} | pid: ${process.pid}`);
	});
}
void bootstrap();
