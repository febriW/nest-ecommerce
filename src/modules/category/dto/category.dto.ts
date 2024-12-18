import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CategoryDto {
    @IsString()
    @ApiProperty()
    name: string
}