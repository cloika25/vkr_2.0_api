import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events } from './events.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events)
    private eventsModel: typeof Events,
  ) {}

  getHello() {
    return 'hello';
  }

  findById(id: string): Promise<Events> {
    return this.eventsModel.findOne({ where: { id } });
  }

  // async findAll(): Promise<Event[]> {
  //   return this.userModel.findAll();
  // }
  // findOne(id: string): Promise<Event> {
  //   return this.userModel.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  // }
  // async remove(id: string): Promise<void> {
  //   const user = await this.findOne(id);
  //   await user.destroy();
  // }
}
