import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { City } from '@modules/cities';
import { User } from '@modules/users';

@ObjectType()
@Entity({ name: 'subscriptions' })
export class Subscription {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Field(() => String)
  @PrimaryColumn({ name: 'city_id' })
  cityId: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => City, (city) => city.subscriptions)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  city: City;
}
