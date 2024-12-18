import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { EntityManager, Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly CategoryRepository: Repository<Category>,
        private readonly entitiManager: EntityManager
    ) {}


    private async findByName(categoryName: string): Promise<Category | null> {
        return this.entitiManager.findOne(Category, {
            where: { name: categoryName }
        })
    }

    async findAll(page: number, limit: number){
        const [ data, total ] = await this.CategoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit
        })

        return {
            data,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        }
    }

    async create(CategoryDTO: CategoryDto) {
        const checkExisting = await this.findByName(CategoryDTO.name)
        if(checkExisting) throw new ConflictException(`Category ${CategoryDTO.name} already created before.`)
        await this.entitiManager.save(CategoryDTO)
    }

    async update(name: string, CategoryDTO: CategoryDto) {
        const checkExisting = await this.findByName(CategoryDTO.name)
        if(!checkExisting) throw new NotFoundException(`Category ${name} not found.`)
        await this.entitiManager.update(Category, checkExisting.id, {name: CategoryDTO.name})
    }

    async deleteCategory(name: string) {
        const checkExisting = await this.findByName(name)
        if(!checkExisting) throw new NotFoundException(`Category ${name} not found.`)
        await this.entitiManager.delete(Category, checkExisting.id)
    }

}