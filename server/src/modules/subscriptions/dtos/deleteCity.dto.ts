import { InputType, PickType } from '@nestjs/graphql';
import { AddCityDto } from './addCity.dto';

@InputType('DeleteCityInput')
export class DeleteCityDto extends PickType(AddCityDto, [
    'name',
] as const) { }