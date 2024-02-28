import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';

import { ICity } from '../interfaces';
import { Subscription } from '@modules/subscriptions/entities/subscription.entity';


@Entity({ name: 'cities' })
export class City implements ICity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];
}
