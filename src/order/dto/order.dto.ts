import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty({ message: 'orderName is required' })
  @Length(1, 100, {
    message: 'orderName length must be between 1 and 100 characters',
  })
  @IsString({ message: 'orderName must be a string' })
  orderName: string;
}
export class UpdateOrderDto {
  @IsNotEmpty({ message: 'orderName is required' })
  @Length(1, 100, {
    message: 'orderName length must be between 1 and 100 characters',
  })
  @IsString({ message: 'orderName must be a string' })
  orderName: string;
}
