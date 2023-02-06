import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService, ConfigType } from '@nestjs/config';
import commonConfig from './config/common.config';
// import * as csurf from 'csurf';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigType<typeof commonConfig> = app.get(ConfigService);

  // const corsConfiguration = {};
  // if (config.accessControlOriginUrl.production) {
  //   corsConfiguration = {
  //     credentials: true,
  //     exposedHeaders: ['accesstoken', 'content-disposition'],
  //     origin: config.accessControlOriginUrl.production,
  //   };
  // }

  // corsConfiguration = {
  //   credentials: true,
  //   exposedHeaders: ['accesstoken', 'content-disposition'],
  //   origin: config.accessControlOriginUrl.local,
  // };

  const openAPIOptions = new DocumentBuilder()
    .setTitle(config.swaggerTitle)
    .setDescription(config.swaggerDescription)
    .setVersion(config.swaggerVersion)
    .build();

  const openAPIDocument = SwaggerModule.createDocument(app, openAPIOptions);
  SwaggerModule.setup('api-docs', app, openAPIDocument);

  app.enableCors();
  app.use(helmet());
  // app.use(csurf());
  const port = config.port || 3005;
  await app.listen(port);
}
bootstrap();
