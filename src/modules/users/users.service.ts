import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UpdateRoleDto } from './dto/user.dto';
import { EntityManager, Repository, In } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../roles/roles.entity';

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

  create(createUserDto: CreateUserDto) {
    return this.entityManager.transaction(async (transactionEntity) => {
      const existingAccount =  await transactionEntity.findOne(User, {
        where: { username: createUserDto.username },
      })

      if (existingAccount) {
        throw new ConflictException('Account already registered with this username.')
      }
      const roleId = createUserDto.role || 3
      const defaultRole = await transactionEntity.findOne(Roles, {
        where: { id: roleId },
      })
      if(!defaultRole) throw new NotFoundException('Role not exist')
        const user = transactionEntity.create(User, {
          ...createUserDto,
          role: defaultRole,
      })
      await transactionEntity.save(user)
    })
  }

  findAll() {
    return this.usersRepository.find()
  }

  findOne(username: string) {
    return this.usersRepository.findOneBy({username})
  }

  updateUserByUsername(username: string, updateUserDto: UpdateUserDto): Promise<User|undefined> {
    return this.entityManager.transaction(async (transactionEntity) => {
      const user = await this.findUserByUsername(username)
      if(!user) return undefined
      Object.assign(user, updateUserDto)
      await transactionEntity.save(User, user)
    })
  }

  updateRole(username: string, role: UpdateRoleDto): Promise<UpdateRoleResponse | undefined>{
    return this.entityManager.transaction(async (transactionEntity) => {
      const user = await this.findUserByUsername(username)
      if(!user) return {msg : `Account with username ${username} Not Found`}
      if (!role.role) return { msg: 'No roles provided' }
      const roleCheck = await transactionEntity.findOne(Roles, {
        where: { id: role.role },
      })
      if(!roleCheck) return {msg : `Roles not exist`}
      user.role = roleCheck
      await this.entityManager.save(User, user)
    })
  }

  remove(username: string) {
    this.usersRepository.delete(username)
  }
}
