import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(signInDto: SignInDto): Promise<{access_token: string}> {
        const user = await this.usersService.findOne(signInDto.username)
        if(!user)
            throw new UnauthorizedException('Unauthorized' , {
               cause: new Error(),
               description: 'User related not found or registered yet!' 
            })

        const password = await bcrypt.compare(signInDto.password, user.password)
        const payload = {username: user.username, sub: user.email}

        if(!password){
            throw new UnauthorizedException('Unauthorized', {
                cause: new Error(),
                description: 'Password not matched!'
            })
        }
        return {access_token: await this.jwtService.signAsync(payload)}
    }
}
