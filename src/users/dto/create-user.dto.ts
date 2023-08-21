import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsDateString
} from "class-validator"

export class CreateUserDto {

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
