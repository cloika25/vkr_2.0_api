import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events } from './events.model';
import { EventsDto, GetEventsResponse, PostEventRequest } from './events.types';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events)
    private eventsModel: typeof Events,
  ) {}

  async findAll(): Promise<Events[]> {
    return this.eventsModel.findAll();
  }

  async getAllEvents(): Promise<GetEventsResponse> {
    const response = new GetEventsResponse();
    const allEvents = await this.findAll();
    response.totalCount = allEvents.length;
    response.entities = allEvents.map((event) => new EventsDto(event));
    return response;
  }

  findOne(id: number): Promise<Events> {
    return this.eventsModel.findOne({
      where: {
        id,
      },
    });
  }

  async createEvent(event: PostEventRequest) {
    const response = await this.eventsModel.create({
      ...event,
    });
    return response.id;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
