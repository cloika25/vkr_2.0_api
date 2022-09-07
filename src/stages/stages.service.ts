import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventsService } from '../Event/events.service';
import { Stages } from './stages.model';
import { PostStagesRequest } from './stages.types';

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stages)
    private stagesModel: typeof Stages,
    private eventsService: EventsService,
  ) {}

  /** Получить все этапы по мероприятию */
  async findAllByEventId(eventId: number) {
    const stages = await this.stagesModel.findAll({
      where: {
        eventId: eventId,
      },
    });
    return stages;
  }

  async createStage(data: PostStagesRequest) {
    this.eventsService.findOne(data.eventId);
  }
}
