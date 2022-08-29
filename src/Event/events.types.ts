import { ApiProperty } from '@nestjs/swagger';

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
}

/** Параметры для получения мероприятия по Id */
export class GetEventsByIdRequest {
  @ApiProperty({ description: 'Идентификатор мероприятия', nullable: false })
  id: string;
}

export class GetEventsByIdResponse extends EventsDto {}
