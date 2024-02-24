import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { ICity } from '@modules/cities/interfaces';
import { IUser } from '@modules/users/interfaces';
import { ISubscription } from '../interfaces';

@ObjectType()
@Entity({ name: 'subscriptions' })
export class Subscription implements ISubscription {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String)
  @Column()
  cityId: string;

  @ManyToOne('User', 'subscriptions', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: IUser;

  @ManyToOne('City', 'subscriptions', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  city: ICity;
}
