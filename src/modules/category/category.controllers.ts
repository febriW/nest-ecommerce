import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CategoryDto } from "./dto/category.dto";


@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    findall(){
        return this.categoryService.findAll(1,1)
    }

    @Post()
    create(@Body() createDto: CategoryDto){
        return this.categoryService.create(createDto)
    }

    @Patch(':name')
    @HttpCode(204)
    Update(@Param('name') name: string, @Body() categoryDto: CategoryDto){
        return this.categoryService.update(name, categoryDto)
    }

    @Delete(':name')
    @HttpCode(204)
    deleteCategory(@Param('name') name: string){
        return this.categoryService.deleteCategory(name)
    }
}