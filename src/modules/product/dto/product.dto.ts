import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ProductDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNumber()
    stock: number
}