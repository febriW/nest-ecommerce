import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsDateString
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

    @IsDateString({},{message: 'Invalid Date Format'})
    @ApiProperty()
    updated_at: Date;
}
