import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { ICity } from '@modules/cities/interfaces';
import { ISubscription } from '@modules/subscriptions/interfaces';
import { IUser } from '../interfaces';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshTokenHash: string | null;

  @ManyToMany('City', { cascade: true })
  @JoinTable({
    name: 'subscriptions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'city_id',
      referencedColumnName: 'id',
    },
  })
  cities: ICity[];

  @OneToMany('Subscription', 'user')
  subscriptions: ISubscription[];
}
