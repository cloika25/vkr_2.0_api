import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Events extends Model {
  @Column
  fullName: string;

  @Column
  dateStart: Date;

  @Column
  dateEnd: Date;
}
