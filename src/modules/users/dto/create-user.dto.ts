import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
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
}
