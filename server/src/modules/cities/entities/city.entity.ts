import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

@Entity({ name: 'cities' })
export class City {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    name: string
}
