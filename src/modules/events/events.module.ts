import { ConfigModule } from '@nestjs/config';
import { Events } from './events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Events]), ConfigModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
