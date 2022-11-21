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

  async create(data) {
    const result = await this.stagesModel.create(data);
    return result
  }
}
