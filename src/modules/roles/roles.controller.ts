import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { Roles } from "./decorator/roles.decorator";
import { RolesDto } from "./dto/roles.dto";

@ApiTags('roles')
@Controller('roles')
@Roles('superadmin')
export class RolesController {
    constructor(private readonly rolesService: RolesService){}

    @Get()
    findAll(){
        return this.rolesService.findAll()
    }

    @Post()
    create(@Body() createRolesDto: RolesDto){
        return this.rolesService.create(createRolesDto)
    }

    @Patch(':name')
    @HttpCode(204)
    Update(@Param('name') name: string, @Body() roleDto: RolesDto){
        return this.rolesService.update(name, roleDto)
    }

    @Delete(':name')
    @HttpCode(204)
    deleteRole(@Param('name') name: string){
        return this.rolesService.deleteRole(name)
    }
}