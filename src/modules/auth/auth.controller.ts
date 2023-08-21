import { 
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request
} from '@nestjs/common'
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@ApiTags('ecommerce')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>){
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req
  }
}
