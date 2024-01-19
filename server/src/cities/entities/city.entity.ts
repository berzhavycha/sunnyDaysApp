import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('City')
@Entity({ name: 'cities' })
export class City {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  cityId: string;

  @Field(() => String)
  @Column({ unique: true })
  cityName: string;
}
