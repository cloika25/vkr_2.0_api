import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Format extends Model {
  @Column
  name: string;
}
