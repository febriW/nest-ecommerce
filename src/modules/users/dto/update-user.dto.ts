import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString
} from "class-validator"

export class UpdateUserDto {
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
