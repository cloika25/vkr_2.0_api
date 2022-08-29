import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EventsDto, GetEventsByIdRequest } from './events.types';

@ApiTags('Events')
@Controller('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Получение мероприятия по Id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор мероприятия',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EventsDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param() params: GetEventsByIdRequest) {
    return this.eventsService.findOne(params.id);
  }
}
