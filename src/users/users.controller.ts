import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ecommerce')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const res = await this.usersService.findOne(username)
    if(!res) return { message: `User ${username} not found` }
    return res
  }

  @Put(':username')
  async UpdateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.updateUserByUsername(username, updateUserDto)
    if(!updatedUser) return { message: `User ${username} not found`}
    return updatedUser
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
