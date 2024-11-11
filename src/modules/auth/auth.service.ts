import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(signInDto: SignInDto): Promise<any> {
        const user = await this.usersService.findOne(signInDto.username)
        if(!user)
            throw new UnauthorizedException()

        const password = await bcrypt.compare(signInDto.password, user.password)
        if(password){
            const payload = {username: user.username, sub: user.email}
            return {access_token: await this.jwtService.signAsync(payload)}
        }
            
        return new UnauthorizedException()
    }
}
