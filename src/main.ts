import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService, ConfigType } from '@nestjs/config';
import commonConfig from './config/common.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigType<typeof commonConfig> = app.get(ConfigService);

  let corsConfiguration = {};
  if (config.isProduction) {
    corsConfiguration = {
      credentials: true,
      exposedHeaders: ['accesstoken', 'content-disposition'],
      origin: config.accessControlOriginUrl.production,
    };
  }

  const openAPIOptions = new DocumentBuilder()
    .setTitle(config.swaggerTitle)
    .setDescription(config.swaggerDescription)
    .setVersion(config.swaggerVersion)
    .build();

  const openAPIDocument = SwaggerModule.createDocument(app, openAPIOptions);
  SwaggerModule.setup('api-docs', app, openAPIDocument);

  app.enableCors(corsConfiguration);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));

  const port = config.port || 3005;
  await app.listen(port);
}
bootstrap();
