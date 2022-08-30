import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UserDto } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private usersModel: typeof Users,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersModel.findAll();
  }

  findOne(params: Partial<UserDto>): Promise<Users> {
    return this.usersModel.findOne({
      where: {
        id: params.id,
        login: params.login,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne({ id: id });
    await user.destroy();
  }
}
