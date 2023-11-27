import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptor/timeout.intercetor';
import { ConfigService } from '@nestjs/config';
import {
  HttpExceptionFilter,
  AuthErrorFilter,
  ErrorFilter,
} from './common/exception/exception.filter';
import { WinstonLogger } from './common/logger/winstonLogger.service';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new TimeoutInterceptor(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(
    new ErrorFilter(),
    new HttpExceptionFilter(),
    new AuthErrorFilter(),
  );

  // const origin = configService.get<string>('ALLOWED_ORIGIN');
  app.useLogger(app.get(WinstonLogger));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const redisStore = new RedisStore({
    client: new Redis({
      port: configService.get<number>('REDIS_PORT'),
      host: configService.get<string>('REDIS_HOST'),
      password: configService.get<string>('REDIS_PASSWORD'),
    }),
    prefix: 'sess:',
  });

  app.use(cookieParser());
  app.use(
    session({
      store: redisStore,
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'lax',
        secure: configService.get<string>('NODE_ENV') === 'production',
      },
    }),
  );
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
