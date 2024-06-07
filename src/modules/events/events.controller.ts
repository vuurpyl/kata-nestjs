import { EventsService } from './events.service';
import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post} from "@nestjs/common";
import { Events } from './events.entity';

@Controller()
export class EventsController {
  constructor(private readonly eventHandlerService: EventsService) {}

  @HttpCode(200)
  @Post()
  async createEvent(
    @Body() event: Events,
  ): Promise<Events> {
    try {
      return null;
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

  @HttpCode(200)
  @Get(':id')
  async getEvent(): Promise<Events> {
    try {
      return null;
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
