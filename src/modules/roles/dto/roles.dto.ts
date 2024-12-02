import { ApiProperty } from "@nestjs/swagger"
import {
    IsString
} from "class-validator"

export class RolesDto {
    @IsString()
    @ApiProperty()
    name: string;
}