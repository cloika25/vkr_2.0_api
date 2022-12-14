import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class Users extends Model {
  @Column
  login: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column
  surname: string;

  @Column
  email: string;
}
