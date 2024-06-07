import { AppModule } from './modules/main/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

/* CREATE NEW LOGGER INSTANCE AS LOGGERSERVICE  */
const logger = new Logger('MainEvent');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );

  const options = new DocumentBuilder()
    .setTitle('Event Service')
    .setDescription('The Event API description')
    .setVersion('1.0')
    .addTag('Event')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/events/docs', app, document);
  await app.listen(3004, () => {
    logger.log(`Event Server is listening to port 3004...`);
  });
}
bootstrap().catch((e) => {
  logger.log(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
