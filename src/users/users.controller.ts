import { Controller, Get, Post, Put, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';

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
    if(!res) throw new HttpException(`Account with username ${username} Not Found`, HttpStatus.NOT_FOUND);
    return res
  }

  @Put(':username')
  async UpdateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.updateUserByUsername(username, updateUserDto)
    if(!updatedUser) throw new HttpException(`Account with username ${username} Not Found`, HttpStatus.NOT_FOUND);
    return updatedUser
  }

  @Delete(':username')
  async remove(@Param('username') username: string) {
    const checkUser = await this.usersService.findOne(username)
    if (!checkUser) throw new HttpException(`Account with username ${username} Not Found`, HttpStatus.NOT_FOUND);
    return this.usersService.remove(username);
  }
}
