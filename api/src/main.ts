import { AppModule } from '@/app.module';
import validationOptions from '@/common/validate/validation.options';
import { AppConfig } from '@/config/app.config';
import httpRequestLogger from '@/logger/http-request-logger';
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

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app', { infer: true });

  app.setGlobalPrefix(appConfig.apiPrefix)
    .enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    })
    .enableShutdownHooks()
    .useGlobalPipes(new ValidationPipe(validationOptions))
    .useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    )
    .enableCors();
  app.use(httpRequestLogger);

  await app.listen(appConfig.apiPort, appConfig.apiHost, async() => {
    const appUrl = await app.getUrl();
    logger.info(`🚀 Server NestApi running. Application on url: ${appUrl}`);
    logger.info(
      `✨ ${appConfig.apiHost}:${appConfig.apiPort} | mode: ${appConfig.nodeEnv} | pid: ${process.pid}`,
    );
  });
}
void bootstrap();
