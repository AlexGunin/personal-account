import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userModel.create({ ...dto });
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async getOne(id: string): Promise<User> {
    return await this.userModel.findByPk(id);
  }

  async delete(id: string): Promise<number> {
    return await this.userModel.destroy({ where: { id } });
  }
}
