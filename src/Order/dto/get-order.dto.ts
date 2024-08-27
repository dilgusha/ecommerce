import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetOrderDto {
    @Type()
    @IsNumber()
    @ApiProperty({ default: 0, required: false })
    @IsOptional()
    @Max(50)
    limit: number;

    @Type()
    @IsNumber()
    @ApiProperty({ default: 0, required: false })
    @IsOptional()
    @Min(0)
    page: number;
}