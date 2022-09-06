import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { EventsService } from './events.service';
import {
  EventsDto,
  GetEventsByIdRequest,
  GetEventsResponse,
  PostEventRequest,
  PostEventResponse,
} from './events.types';

@ApiSecurity('JWT token', ['JWT token'])
@ApiTags('Events')
@UseGuards(JwtAuthGuard)
@Controller('Events')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
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
  findOne(@Param() params: GetEventsByIdRequest) {
    return this.eventsService.findOne(params.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка мероприятий' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: GetEventsResponse,
  })
  async findAll() {
    return await this.eventsService.getAllEvents();
  }

  @Post()
  @ApiOperation({ summary: 'Создание мероприятия' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PostEventResponse,
  })
  async createEvent(@Body() data: PostEventRequest) {
    return await this.eventsService.createEvent(data);
  }

  @Delete()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор мероприятия',
  })
  @ApiOperation({ summary: 'Удаление мероприятия' })
  async deleteEvent(@Param() params: { id: number }) {
    return this.eventsService.remove(params.id);
  }
}
