import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';

describe('AuthService', () => {
  let service: AuthService
  let JWTService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('LoginService', () => {
    it('should return jwt token', async () => {
      const result = await service.signIn({
        username: 'superadmin',
        password: 'superadmin'
      })
      expect(result).toBeDefined()
      const decoded = await JWTService.verifyAsync(result.access_token, {
        secret: jwtConstants.secret
      })
      expect(decoded).toHaveProperty(jwtConstants.secret)
    })
  })

});
