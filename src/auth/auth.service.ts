import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/users.types';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constans';
import { RegistrationRequest } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /** Проверка пароля пользователя  */
  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ login: login });
    if (user && user.password === pass) {
      const serializedUser = new UserDto(user);
      const { password, ...result } = serializedUser;
      return result;
    }
    return null;
  }

  /** Авторизация пользователя */
  async login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }

  /** Регистрация нового пользователя */
  async registration(payload: RegistrationRequest) {
    const createdUsers = await this.usersService.findOne({
      login: payload.login,
    });
    if (createdUsers) {
      return 'Данный логин уже используется';
    }
    const newUser = await this.usersService.create(payload);
    return await this.login(newUser);
  }
}
