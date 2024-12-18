import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/modules/roles/decorator/roles.decorator';
import { User } from '../modules/users/user.entity'
import { DataSource } from 'typeorm';
import { Roles } from 'src/modules/roles/roles.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    const userWithRole = await this.dataSource
      .getRepository(User)
      .findOne({
        where: { username: user.username },
        relations: ['role'],
      });

    if (!userWithRole || !userWithRole.role) {
      throw new ForbiddenException('User roles not found.')
    }

    const userRole = userWithRole.role.name
    const hasRole = requiredRoles.includes(userRole)
    if (!hasRole) {
      throw new ForbiddenException('You do not have the required roles.')
    }

    return true;
  }

}
