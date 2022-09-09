import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Format } from './format.model';

export class FormatDto {
  @ApiProperty({ nullable: false, description: 'Идентификатор формата этапа' })
  id: number;

  @ApiProperty({ nullable: false, description: 'Наименование формата этапа' })
  name: string;

  constructor(format: Format) {
    this.id = format.id;
    this.name = format.name;
  }
}

export class GetFormatRequest {}

export class GetFormatResponse {
  @ApiProperty({ nullable: false, type: [FormatDto] })
  entities: FormatDto[];

  @ApiProperty({ nullable: false, description: 'Общее количество сущностей' })
  totalCount: number;
}

export class PostFormatRequest {
  @ApiProperty({ nullable: false, description: 'Наименование формата этапа' })
  @IsString()
  name: string;
}

export class PostFormatResponse {
  @ApiProperty({ description: 'Идентификатор формата' })
  id: number;
}

export class PutFormatRequest {
  @ApiProperty({ description: 'Идентификатор формата' })
  id: number;

  @ApiProperty({ description: 'Наиманование формата' })
  name: string;
}

export class DeleteFormatRequest {
  @ApiProperty({ description: 'Идентификатор формата' })
  id: number;
}
