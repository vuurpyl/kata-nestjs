import { Moderator } from '../moderator/moderator.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
    @InjectRepository(Moderator)
    private moderatorsRepository: Repository<Moderator>
  ) {}

  async createEvent(event: Events): Promise<Events> {
    try {
      return await this.eventsRepository.save(event);
    } catch (error) {
      throw new Error('Error saving event: ' + error.message);
    }
  }

  async getEventById(id: number): Promise<Events> {
    try {
      const event = await this.eventsRepository.findOneBy({ id });
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } catch (error) {
      throw new Error('Error fetching event: ' + error.message);
    }
  }

  async addModeratorToEvent(eventId: number, moderator: Moderator): Promise<Moderator> {
    try {
      const event = await this.getEventById(eventId);
      if (!event) {
        throw new Error('Event not found');
      }
      moderator.event = event;
      return await this.moderatorsRepository.save(moderator);
    } catch (error) {
      throw new Error('Error adding moderator: ' + error.message);
    }
  }

  async getEventsByDate(date: string): Promise<any[]> {
    try {
      console.log(date)
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const events = await this.eventsRepository.createQueryBuilder('event')
        .leftJoinAndSelect('event.moderators', 'moderator')
        .where('event.originalTimestamp >= :startDate', { startDate })
        .andWhere('event.originalTimestamp < :endDate', { endDate })
        .orderBy('event.originalTimestamp', 'ASC')
        .select([
          'event.code',
          'event.startDate',
          'moderator.firstname',
          'moderator.lastname',
          'moderator.email',
          'moderator.phone'
        ])
        .getMany();

      return events.map(event => ({
        code: event.code,
        startDate: event.startDate,
        moderators: event.moderators
      }));
    } catch (error) {
      throw new Error('Error fetching events by date: ' + error.message);
    }
  }
}
