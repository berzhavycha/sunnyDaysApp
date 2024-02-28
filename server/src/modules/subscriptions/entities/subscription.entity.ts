import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { ISubscription } from '../interfaces';
import { City } from '@modules/cities/entities/city.entity';
import { User } from '@modules/users/entities/user.entity';

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

  @ManyToOne(() => User, user => user.subscriptions, { onDelete: 'CASCADE', createForeignKeyConstraints: true })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => City, city => city.subscriptions, { onDelete: 'CASCADE', createForeignKeyConstraints: true })
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  city: City;
}
