import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from 'referral-pulse-commons';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from '../health/health.controller';
import { Module } from '@nestjs/common';
import { ReferralEvents } from '../referral-events/referral.events.entity';
import { ReferralEventsModule } from '../referral-events/referral.events.module';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'cockroachdb',
        host: configService.getOrThrow<string>('database.host'),
        port: configService.getOrThrow<number>('database.port'),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.getOrThrow<string>('database.password'),
        database: configService.getOrThrow<string>('database.database'),
        entities: [ReferralEvents],
        migrationsRun: configService.getOrThrow<boolean>(
          'database.migrationsRun'
        ),
        logging: configService.getOrThrow<boolean>('database.logging'),
        synchronize: true,
        /* ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false
          }
        } */
      }),
      inject: [ConfigService],
    }),
    TerminusModule,
    ReferralEventsModule,
    CommonModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
