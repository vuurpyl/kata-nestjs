import { ConfigModule } from '@nestjs/config';
import { Events } from './events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { Moderator } from '../moderator/moderator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Moderator]), ConfigModule],
  controllers: [EventsController],
  providers: [EventsService, AuthGuard],
})
export class EventsModule {}


