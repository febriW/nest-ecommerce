import { Controller, Get, Post, Put, Patch, Body, Param, Delete, Request, HttpStatus, HttpCode, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UpdateRoleDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { Roles } from '../roles/decorator/roles.decorator';
import { Public } from '../auth/decorator/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('superadmin', 'admin' )
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Request() Req: any){
    return Req.user
  }

  @Get(':username')
  @Roles('superadmin', 'admin')
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

  @Patch(':username')
  @HttpCode(204)
  @Roles('superadmin')
  async UpdateRole(@Param('username') username: string, @Body() role: UpdateRoleDto) {
    const updateRole = await this.usersService.updateRoles(username, role)
    if(updateRole?.msg) throw new BadRequestException(updateRole.msg)
    return 
  }

  @Delete(':username')
  @Roles('superadmin', 'admin')
  async remove(@Param('username') username: string) {
    const checkUser = await this.usersService.findOne(username)
    if (!checkUser) throw new HttpException(`Account with username ${username} Not Found`, HttpStatus.NOT_FOUND);
    return this.usersService.remove(username);
  }
}
