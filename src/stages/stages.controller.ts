import {
  Body,
  Controller,
  Get,
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
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { StagesService } from './stages.service';
import { PostStagesRequest } from './stages.types';

@ApiSecurity('JWT token', ['JWT token'])
@UseGuards(JwtAuthGuard)
@ApiTags('Stages')
@Controller('Stages')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get(':eventId')
  @ApiParam({
    name: 'eventId',
    required: true,
    description: 'Идентификатор мероприятия',
  })
  @ApiOperation({ summary: 'Получить все этапы по мероприятию' })
  async findAll(@Param() params: { eventId: number }) {
    return await this.stagesService.findAllByEventId(params.eventId);
  }

  @Post()
  @ApiOperation({ summary: 'Создать этап' })
  async createStage(@Body() data: PostStagesRequest) {
    return '';
  }
}
