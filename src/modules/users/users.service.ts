import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UpdateRoleDto } from './dto/user.dto';
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
    return this.usersRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const existingAccount =  await this.entityManager.findOne(User, {
      where: { username: createUserDto.username },
    })

    if (existingAccount) {
      throw new ConflictException('Account already registered with this username.');
    }

    const roleId = createUserDto.role || 3;
    const defaultRole = await this.entityManager.findOne(Roles, {
      where: { id: roleId },
    })
    if(!defaultRole) throw new NotFoundException('Role not exist')
    const user = this.entityManager.create(User, {
      ...createUserDto,
      role: defaultRole,
    })
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
    return updatedUser
  }

  async updateRole(username: string, role: UpdateRoleDto): Promise<UpdateRoleResponse | undefined>{
    const user = await this.findUserByUsername(username)
    if(!user) return {msg : `Account with username ${username} Not Found`}
    if (!role.role) return { msg: 'No roles provided' }
    const roleCheck = await this.entityManager.findOne(Roles, {
      where: { id: role.role },
    })
    if(!roleCheck) return {msg : `Roles not exist`}
    user.role = roleCheck
    await this.entityManager.save(User, user)
    return
  }

  remove(username: string) {
    this.usersRepository.delete(username)
  }
}
