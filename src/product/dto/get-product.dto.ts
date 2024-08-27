import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetProductDto {
    @Type()
    @IsOptional()
    @ApiProperty({ default: 'iphone', required: false })
    @IsString()
    name: string;

    @Type()
    @IsOptional()
    @ApiProperty({ default: 0, required: false })
    @IsNumber({}, { each: true })
    minPrice: number

    @Type()
    @IsOptional()
    @ApiProperty({ default: 1000, required: false })
    @IsNumber({}, { each: true })
    maxPrice: number;

    @Type()
    @IsOptional()
    @ApiProperty({ default: 5, required: false })
    @IsNumber()
    limit: number;

    @Type()
    @IsOptional()
    @ApiProperty({ default: 0, required: false })
    @IsNumber()
    page: number;

    @Type()
    @IsOptional()
    @ApiProperty({ default: [1, 2], required: false, type: String })
    @Transform(({ value }) => (value.split(',').map(Number)))
    categories: number[];
}