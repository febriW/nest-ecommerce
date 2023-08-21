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
    return this.usersRepository.find()
  }

  findOne(username: string) {
    return this.usersRepository.findOneBy({username})
  }

  async updateUserByUsername(username: string, updateUserDto: UpdateUserDto): Promise<User|undefined> {
    const user = await this.usersRepository.findOneBy({username})
    if(!user) return undefined
    user.password = updateUserDto.password
    user.updated_at = updateUserDto.updated_at
    const updatedUser = await this.entityManger.save(User, user)
    return updatedUser
  }

  remove(username: string) {
    this.usersRepository.delete(username)
  }
}
