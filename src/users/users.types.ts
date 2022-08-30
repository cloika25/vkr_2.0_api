import { Users } from './users.model';

/** DTO модель пользователя */
export class UserDto {
  id: string;

  login: string;

  password: string;

  name: string;

  constructor(payload: Users) {
    this.id = payload.id;
    this.login = payload.login;
    this.password = payload.password;
    this.name = payload.name;
  }
}
