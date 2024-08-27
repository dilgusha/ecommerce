import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class GetCategoryDto {
    @Type()
    @IsOptional()
    @ApiProperty({ default: 'category_name', required: false })
    @IsString()
    name: string;
}