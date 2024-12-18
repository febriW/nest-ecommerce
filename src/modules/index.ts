import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

export const ListModules = [
    UsersModule,
    AuthModule,
    RolesModule,
    CategoryModule,
    ProductModule
]