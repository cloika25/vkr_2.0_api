import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events } from './events.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events)
    private eventsModel: typeof Events,
  ) {}

  async findAll(): Promise<Events[]> {
    return this.eventsModel.findAll();
  }

  findOne(id: string): Promise<Events> {
    return this.eventsModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
