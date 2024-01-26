import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('SubscriptionResponse')
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
  cityName: string;
}
