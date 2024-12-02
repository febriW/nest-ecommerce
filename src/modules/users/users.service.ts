import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateRoleDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository, In } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../roles/entities/roles.entity';

interface UpdateRoleResponse {
  msg?: string
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  private async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

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
    if(!defaultRoles) throw new NotFoundException('Roles not exist')
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
    const user = await this.findUserByUsername(username)
    if(!user) return undefined
    Object.assign(user, updateUserDto)
    const updatedUser = await this.entityManager.save(User, user)
    if (![1,2].includes(updatedUser.roles[0].id)) updatedUser.roles = [] 
    return updatedUser
  }

  async updateRoles(username: string, role: UpdateRoleDto): Promise<UpdateRoleResponse | undefined>{
    const user = await this.findUserByUsername(username)
    if(!user) return {msg : `Account with username ${username} Not Found`}
    if (!role.roles || role.roles.length === 0) return { msg: 'No roles provided' }
    const roles = await this.entityManager.findBy(Roles, {id: In(role.roles)})
    if(!roles) return {msg : `Roles not exist`}
    user.roles = roles
    await this.entityManager.save(User, user)
    return
  }

  remove(username: string) {
    this.usersRepository.delete(username)
  }
}
