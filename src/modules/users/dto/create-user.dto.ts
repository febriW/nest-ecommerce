import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsOptional,
    ArrayNotEmpty, 
    IsArray
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

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({ type: [Number], description: 'Array of role IDs' })
    roles?: number[];
}
