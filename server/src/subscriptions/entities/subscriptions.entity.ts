import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Subscription')
@Entity({ name: 'subscriptions' })
export class Subscription {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  subscriptionId: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String)
  @Column()
  cityId: string;
}
