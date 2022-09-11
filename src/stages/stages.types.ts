import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostStagesRequest {
  @ApiProperty({ description: 'Наименование этапа', nullable: false })
  name: string;

  @ApiProperty({ description: 'Описание этапа' })
  description: string;

  @ApiProperty({ description: 'Дата начала', nullable: false })
  dateStart: Date;

  @ApiProperty({ description: 'Дата окончания' })
  dateEnd: Date;

  @ApiProperty({ description: 'Тип этапа', nullable: false })
  formatId: number;

  @ApiProperty({ description: 'Мероприятие', nullable: false })
  @IsNotEmpty()
  eventId: number;
}

export class PostStagesResponse {
  @ApiProperty({ description: 'Идентификатор нового этапа' })
  id: number;
}
