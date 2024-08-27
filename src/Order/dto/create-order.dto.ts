import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateOrderItemDto {
  @Type()
  @IsNumber()
  @ApiProperty()
  productId: number;
}

export class CreateOrderDto {
  @Type()
  @IsString()
  @ApiProperty()
  @MinLength(10)
  address: string;

  @Type()
  @IsString()
  @ApiProperty()
  @Length(3, 11)
  postCode: string;

  @Type()
  @ApiProperty()
  @IsString()
  phone: string;

  @Type(() => CreateOrderItemDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: CreateOrderItemDto, isArray: true })
  items: CreateOrderItemDto[];
}