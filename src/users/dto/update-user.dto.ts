import { CreateUserDto } from './create-user.dto'
import {
    IsEmail,
    IsDate,
    IsString
} from "class-validator"

export class UpdateUserDto {
    @IsString()
    password: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail({},{message: 'Invalid Email'})
    email: string;

    @IsDate({message: 'Invalid Date Format'})
    updated_at: Date;
}
