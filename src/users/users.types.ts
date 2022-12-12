import { Users } from './users.model';

/** DTO модель пользователя */
export class UserDto {
  id: number;

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

/** Модель для добавление в описание мероприятия */
export class Author {
  id: string;

  login: string;

  name: string

  constructor(payload: Users) {
    this.id = payload.id;
    this.login = payload.login;
    this.name = payload.name;
  }
}