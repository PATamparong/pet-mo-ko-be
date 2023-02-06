import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  port: process.env.PORT,
  accessControlOriginUrl: {
    production: process.env.PRODUCTION_ORIGIN_URL,
    local: process.env.LOCAL_ORIGIN_URL,
  },
  swaggerTitle: process.env.API_TITLE,
  swaggerDescription: process.env.API_DESCRIPTION,
  swaggerVersion: process.env.API_VERSION,
}));
