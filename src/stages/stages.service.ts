import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FormatService } from '../format/format.service';
import { EventsService } from '../Event/events.service';
import { Stages } from './stages.model';
import { PostStagesRequest } from './stages.types';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stages)
    private stagesModel: typeof Stages,
    private eventsService: EventsService,
    private formatService: FormatService,
  ) { }

  /** Получить все этапы по мероприятию */
  async findAllByEventId(eventId: string) {
    const stages = await this.stagesModel.findAll({
      where: {
        eventId: eventId,
      },
    });
    return stages;
  }

  /** Создать этап */
  async createStage(data: PostStagesRequest) {
    const tempEvent = await this.eventsService.findOne(data.eventId);
    if (!tempEvent) {
      throw new HttpException(
        `Не найдено мероприятие с идентификатором ${data.eventId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const tempFormat = await this.formatService.findOne(data.formatId);
    if (!tempFormat) {
      throw new HttpException(
        `Не найден формат с идентификатором ${data.formatId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    const resultStage = await this.stagesModel.create({
      ...data,
      event: tempEvent,
      format: tempFormat,
    });
    return resultStage.id;
  }
}
