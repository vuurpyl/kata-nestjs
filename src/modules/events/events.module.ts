import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Events } from './events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// TODO add utm format
@Module({
  imports: [
    TypeOrmModule.forFeature([Events]),
    ConfigModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
