import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stages } from './stages.model';

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stages)
    private stagesModel: typeof Stages,
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
}
