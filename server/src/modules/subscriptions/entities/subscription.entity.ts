import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { City } from '@modules/cities/entities';
import { User } from '@modules/users/entities';

@ObjectType()
@Entity({ name: 'subscriptions' })
export class Subscription {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String)
  @Column()
  cityId: string;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.subscriptions, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: true,
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => City, (city) => city.subscriptions, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: true,
  })
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  city: City;
}
