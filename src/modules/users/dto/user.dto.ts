import { ApiProperty, PickType } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsNumber,
    IsOptional
} from "class-validator"

export class CreateUserDto {

    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    firstname: string;

    @IsString()
    @ApiProperty()
    lastname: string;

    @IsEmail({},{message: 'Invalid Email'})
    @ApiProperty()
    email: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ type: Number, description: 'Role of user' })
    role: number;
}


export class UpdateRoleDto extends PickType(CreateUserDto, ['role'] as const) {}
export class UpdateUserDto extends PickType(CreateUserDto, ['password', 'firstname', 'lastname', 'email'] as const) {}
