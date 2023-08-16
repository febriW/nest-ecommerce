import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManger: EntityManager,
    ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    await this.entityManger.save(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(username: string) {
    return `This action returns a #${username} user`;
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${username} user`;
  }

  remove(username: string) {
    return `This action removes a #${username} user`;
  }
}
