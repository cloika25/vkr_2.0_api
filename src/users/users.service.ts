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

  async findOne(params: Partial<UserDto>): Promise<Users> {
    const tempUser = await this.usersModel.findOne({
      where: {
        ...params,
      },
    });

    return tempUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne({ id: id });
    await user.destroy();
  }
}
