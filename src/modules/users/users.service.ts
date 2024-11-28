import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    ) {}

  async create(createUserDto: CreateUserDto) {
    const existingAccount =  await this.entityManager.findOne(User, {
      where: { username: createUserDto.username },
    })

    if (existingAccount) {
      throw new ConflictException('Account already registered with this username.');
    }

    const rolesIds = createUserDto.roles || [3];
    const defaultRoles = await this.entityManager.findBy(Roles, {
      id: In(rolesIds)
    });
    const user = this.entityManager.create(User, {
      ...createUserDto,
      roles: defaultRoles,
    });
    await this.entityManager.save(user)
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
    const updatedUser = await this.entityManager.save(User, user)
    return updatedUser
  }

  remove(username: string) {
    this.usersRepository.delete(username)
  }
}
