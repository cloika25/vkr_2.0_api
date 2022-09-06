import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Events } from '../Event/events.model';
import { Stages } from '../stages/stages.model';
import { Users } from '../users/users.model';

@Table
export class Registrations extends Model {
  @PrimaryKey
  @Column
  id: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column
  @ForeignKey(() => Users)
  userId: number;

  @BelongsTo(() => Stages)
  stage: Stages;

  @Column
  @ForeignKey(() => Stages)
  stageId: number;

  @BelongsTo(() => Events)
  event: Events;

  @Column
  @ForeignKey(() => Events)
  eventId: number;
}
