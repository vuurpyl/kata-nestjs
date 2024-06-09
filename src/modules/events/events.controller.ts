import { AuthGuard } from '../../guards/auth.guard';
import { EventsService } from './events.service';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { Events } from './events.entity';
import { Moderator } from '../moderator/moderator.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventHandlerService: EventsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post()
  async createEvent(@Body() event: Events): Promise<Events> {
    try {
      return await this.eventHandlerService.createEvent(event);
    } catch (errors) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errors.message,
          error: errors,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':id')
  async getEvent(@Param('id') id: number): Promise<Events> {
    try {
      return await this.eventHandlerService.getEventById(id);
    } catch (errors) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errors.message,
          error: errors,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post(':eventId/moderators')
  async addModerator(@Param('eventId') eventId: number, @Body() moderator: Moderator): Promise<Moderator> {
    try {
      return await this.eventHandlerService.addModeratorToEvent(eventId, moderator);
    } catch (errors) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errors.message,
          error: errors,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':date')
  async getEventsByDate(@Param('date') date: string): Promise<any[]> {
    try {
      return await this.eventHandlerService.getEventsByDate(date);
    } catch (errors) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errors.message,
          error: errors,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}