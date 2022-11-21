import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stages } from './stages.model';
import { StageInEvent } from './stages.types';

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stages)
    private stagesModel: typeof Stages,
  ) { }

  /** Получить все этапы по мероприятию */
  async findAllByEventId(eventId: string): Promise<StageInEvent[]> {
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
