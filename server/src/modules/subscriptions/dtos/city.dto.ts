import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('CityInput')
export class CityDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
