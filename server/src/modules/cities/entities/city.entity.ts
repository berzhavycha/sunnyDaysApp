import { Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Subscription } from '@modules/subscriptions/entities';

@Entity({ name: 'cities' })
export class City {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @OneToMany(() => Subscription, (subscription) => subscription.city)
  subscriptions: Subscription[];
}
