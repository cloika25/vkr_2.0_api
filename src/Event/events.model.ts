import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from '../users/users.model';

@Table
export class Events extends Model {
  @Column
  fullName: string;

  @Column
  dateStart: Date;

  @Column
  dateEnd: Date;

  @Column
  description: string;

  @BelongsTo(() => Users)
  author: Users;

  @Column
  @ForeignKey(() => Users)
  authorId: string
}
