import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getHello(): string {
    return this.eventsService.getHello();
  }

  @Get(':id')
  findOne(@Param() params): string {
    if (this.eventsService.findById(params.id)) {
      return 'finded';
    }
    return 'unfinded';
  }
}
