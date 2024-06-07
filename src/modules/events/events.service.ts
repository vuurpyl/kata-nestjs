import { Events } from './events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
    private readonly logger: LoggerService
  ) {}
}
