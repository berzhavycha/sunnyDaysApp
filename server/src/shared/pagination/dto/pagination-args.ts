import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

import { Order } from '../../types';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  offset: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsIn(['ASC', 'DESC'], { message: 'Order must be either ASC or DESC' })
  order: Order;
}
