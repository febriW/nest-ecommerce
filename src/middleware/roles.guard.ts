import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/modules/roles/decorator/roles.decorator';
import { User } from '../modules/users/entities/user.entity'
import { DataSource } from 'typeorm';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private dataSource: DataSource) {}

  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
  //     context.getHandler(),
  //     context.getClass()
  //   ]);

  //   if (!requiredRoles) {
  //     return true;
  //   }

  //   const { user }: { user: User} = context.switchToHttp().getRequest()
  //   if (!user.roles || !Array.isArray(user.roles)) {
  //     throw new ForbiddenException('User roles not found.');
  //   }
  //   if (!user || !user.roles.some((role) => requiredRoles.includes(role.name))) {
  //     throw new ForbiddenException('You do not have the required roles.')
  //   }
  //   return true
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    const userWithRoles = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.username = :username', { username: user.username })
      .getOne()

    if (!userWithRoles || !userWithRoles.roles) {
      throw new ForbiddenException('User roles not found.')
    }

    const userRoles = userWithRoles.roles.map((role: Roles) => role.name)
    const hasRole = userRoles.some((role: string) => requiredRoles.includes(role))
    if (!hasRole) {
      throw new ForbiddenException('You do not have the required roles.')
    }

    return true;
  }

}
