import { ApiProperty } from '@nestjs/swagger';
import { Events } from './events.model';

export class EventsDto {
  @ApiProperty({
    description: 'Идентификатор',
    nullable: false,
  })
  id: string;

  @ApiProperty({
    description: 'Полное наименование',
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    description: 'Дата начала',
    nullable: true,
  })
  dateStart: Date;

  @ApiProperty({
    description: 'Дата окончания',
    nullable: true,
  })
  dateEnd: Date;

  constructor(event: Events) {
    this.id = event.id;
    this.fullName = event.fullName;
    this.dateStart = event.dateStart;
    this.dateEnd = event.dateEnd;
  }
}

/** Параметры для получения мероприятия по Id */
export class GetEventsByIdRequest {
  @ApiProperty({ description: 'Идентификатор мероприятия', nullable: false })
  id: number;
}

export class GetEventsByIdResponse extends EventsDto {}

export class GetEventsResponse {
  @ApiProperty({ nullable: false, type: [EventsDto] })
  entities: EventsDto[];

  @ApiProperty({ nullable: false })
  totalCount: number;
}

export class PostEventResponse {
  @ApiProperty({ nullable: false })
  id: number;
}

export class PostEventRequest {
  @ApiProperty({ nullable: false, description: 'Полное название мероприятия' })
  fullName: string;

  @ApiProperty({ nullable: false, description: 'Дата начала мероприятия' })
  dateStart: Date;

  @ApiProperty({ nullable: false, description: 'Дата окончания мероприятия' })
  dateEnd: Date;
}
