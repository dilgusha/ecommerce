import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {  IsNumber, IsOptional, IsString, IsUrl, Length, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @Type()
    @ApiProperty()
    @IsString()
    @Length(3, 50)
    name: string;

    @Type()
    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;

    @Type()
    @ApiProperty()
    @IsOptional()
    @MaxLength(500)
    @IsString()
    description: string;

    @Type()
    @ApiProperty()
    @IsUrl()
    @IsString()
    image: string;

    @Type()
    @IsNumber({}, { each: true })
    @IsOptional()
    @ApiProperty({ type: Number, isArray: true })
    categories: number[];

}