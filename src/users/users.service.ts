import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UserDto } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) { }

  /** Получение всех пользователей */
  async findAll(): Promise<Users[]> {
    return this.usersModel.findAll();
  }

  /** Поиск пользователя по параметрам */
  async findOne(params: Partial<UserDto>): Promise<Users> {
    const tempUser = await this.usersModel.findOne({
      where: {
        ...params,
      },
    });

    return tempUser;
  }

  /** Удаление пользователя */
  async remove(id: number): Promise<void> {
    const user = await this.findOne({ id: id });
    await user.destroy();
  }

  /** Создание пользователя */
  async create(user: Partial<UserDto>): Promise<Users> {
    const createdUser = await this.usersModel.create(user);
    return createdUser;
  }
}
