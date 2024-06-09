import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Events } from '../events/events.entity';
import { Moderator } from '../moderator/moderator.entity';
import { EventsModule } from '../events/events.module';
import { HealthController } from '../health/health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import app from '../../config/app.config';
import database from '../../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [app, database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('database.host'),
        port: configService.getOrThrow<number>('database.port'),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.getOrThrow<string>('database.password'),
        database: configService.getOrThrow<string>('database.database'),
        entities: [Events, Moderator],
        migrationsRun: configService.getOrThrow<boolean>(
          'database.migrationsRun'
        ),
        logging: configService.getOrThrow<boolean>('database.logging'),
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TerminusModule,
    EventsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
