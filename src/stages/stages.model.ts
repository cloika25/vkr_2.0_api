import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Events } from '../Event/events.model';
import { Format } from '../format/format.model';

@Table
export class Stages extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  dateStart: Date;

  @Column
  dateEnd: Date;

  @BelongsTo(() => Format)
  format: Format;

  @Column
  @ForeignKey(() => Format)
  formatId: number;

  @BelongsTo(() => Events)
  event: Events;

  @Column
  @ForeignKey(() => Events)
  eventId: number;
}
