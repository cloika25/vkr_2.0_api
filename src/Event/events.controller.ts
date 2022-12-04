import {
  Body,
  Controller,
  Delete,
  Get,
  Req,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PostStagesRequest, PostStagesResponse } from '../stages/stages.types';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { EventsService } from './events.service';
import {
  EventsDto,
  GetEventsByIdRequest,
  GetEventsResponse,
  PostEventRequest,
  PostEventResponse,
} from './events.types';
import { JWTUser } from 'src/types';

@ApiSecurity('JWT token', ['JWT token'])
@ApiTags('Events')
@UseGuards(JwtAuthGuard)
@Controller('Events')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) { }

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

  @Post()
  @ApiOperation({ summary: 'Создание мероприятия' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PostEventResponse,
  })
  async createEvent(@Body() data: PostEventRequest, @Req() request) {
    if (!('user' in request)) {
      return 'Не удалось найти автора'
    };
    return await this.eventsService.createEvent(data, (request as { user: JWTUser }).user.userId);
  }

  @Delete()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор мероприятия',
  })
  @ApiOperation({ summary: 'Удаление мероприятия' })
  async deleteEvent(@Param() params: { id: number }) {
    return await this.eventsService.remove(params.id);
  }

  @Post(':id/stage')
  @ApiOperation({ summary: 'Создание этапа' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PostStagesResponse,
    description: 'Идентификатор нового этапа',
  })
  async createStage(@Body() data: PostStagesRequest) {
    const newStageId = await this.eventsService.createStage(data);
    const response = new PostStagesResponse();
    response.id = newStageId;
    return response;
  }
}
