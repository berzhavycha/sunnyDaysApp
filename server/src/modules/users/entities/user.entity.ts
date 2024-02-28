import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Subscription } from '@modules/subscriptions/entities';
import { City } from '@modules/cities/entities';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshTokenHash: string | null;

  @ManyToMany(() => City, { cascade: true })
  cities: City[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
