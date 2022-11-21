import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FormatService } from '../format/format.service';
import { StagesService } from '../stages/stages.service';
import { PostStagesRequest } from '../stages/stages.types';
import { Events } from './events.model';
import { EventsDto, GetEventsByIdResponse, GetEventsResponse, PostEventRequest } from './events.types';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events)
    private eventsModel: typeof Events,
    private stagesService: StagesService,
    private formatService: FormatService
  ) { }

  async appendStages(event: EventsDto): Promise<GetEventsByIdResponse> {
    const stagesForEvent = await this.stagesService.findAllByEventId(event.id);
    return { ...event, stages: stagesForEvent }
  }

  async getAllEvents(): Promise<GetEventsResponse> {
    try {
      const allEvents = await this.eventsModel.findAll();
      const response = new GetEventsResponse();
      response.totalCount = allEvents.length;
      response.entities = await Promise.all(allEvents.map((event) => this.appendStages(new EventsDto(event))));
      return response;
    } catch (error) {
      throw new HttpException(
        'Не удалось получить все мероприятия' + error.message,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  findOne(id: number): Promise<Events> {
    try {
      const tempEvent = this.eventsModel.findOne({
        where: {
          id,
        },
      });
      return tempEvent
    } catch (error) {
      throw new HttpException(
        `Не найдено мероприятие с идентификатором ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createEvent(event: PostEventRequest) {
    try {
      const response = await this.eventsModel.create({
        ...event,
      });
      return response.id;
    } catch (error) {
      throw new HttpException(
        'Не удалось создать мероприятие' + error.message,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const event = await this.findOne(id);
      await event.destroy();
    } catch (error) {
      throw new HttpException(
        'Не удалось удалить мероприятие ' + error.message,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  /** Создать этап */
  async createStage(data: PostStagesRequest) {
    const tempEvent = await this.findOne(data.eventId);
    const tempFormat = await this.formatService.findOne(data.formatId);
    const resultStage = await this.stagesService.create({
      ...data,
      event: tempEvent,
      format: tempFormat,
    });
    return resultStage.id;
  }
}
