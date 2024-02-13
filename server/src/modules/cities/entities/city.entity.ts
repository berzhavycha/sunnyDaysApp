import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

import { ISubscription } from '@modules/subscriptions/interfaces';
import { ICity } from '../interfaces';

@Entity({ name: 'cities' })
export class City implements ICity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @OneToMany('Subscription', 'city')
  subscriptions: ISubscription[];
}
