import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoryController } from "./category.controllers";
import { CategoryService } from "./category.service";


@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})

export class CategoryModule {}