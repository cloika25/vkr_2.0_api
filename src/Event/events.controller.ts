import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { EventsService } from './events.service';
import { EventsDto, GetEventsByIdRequest } from './events.types';

@ApiSecurity('JWT token', ['JWT token'])
@ApiTags('Events')
@Controller('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
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
