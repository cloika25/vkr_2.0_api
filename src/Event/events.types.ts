import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Stages } from 'src/stages/stages.model';
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

export class GetEventsByIdResponse extends EventsDto {
  @ApiProperty({ nullable: false, description: 'Этапы мероприятия' })
  stages: Stages[]
}

export class GetEventsResponse {
  @ApiProperty({ nullable: false, type: [EventsDto] })
  entities: GetEventsByIdResponse[];

  @ApiProperty({ nullable: false })
  totalCount: number;
}

export class PostEventResponse {
  @ApiProperty({ nullable: false })
  id: number;
}

export class PostEventRequest {
  @ApiProperty({ nullable: false, description: 'Полное название мероприятия' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ nullable: false, description: 'Дата начала мероприятия' })
  dateStart: Date;

  @ApiProperty({ nullable: false, description: 'Дата окончания мероприятия' })
  dateEnd: Date;

  @ApiProperty({ nullable: true, description: 'Описание мероприятия' })
  description: string;

  @ApiProperty({ nullable: false, description: 'Этапы мероприятия', default: [] })
  stages: Stages[]
}
