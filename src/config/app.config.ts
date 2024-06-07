import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: process.env.APP_NAME || 'referral-pulse',
    env: process.env.APP_ENV || 'development',
    mode: process.env.APP_MODE || 'simple',
    timezone: process.env.APP_TZ || 'Europe/Paris',

    version: process.env.APP_VERSION || '1',
    repoVersion: process.env.APP_VERSION || '1',
    versioning: {
      on: process.env.APP_VERSIONING === 'true' || false,
      prefix: 'v',
    },

    http: {
      host: process.env.APP_HOST || 'localhost',
      port: Number.parseInt(process.env.APP_PORT) || 3000,
    },
    globalPrefix: '/api',
    request: {
      timeout: 10000,
    },
  })
);
