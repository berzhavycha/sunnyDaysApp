import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IUser } from '../interfaces';
import { City } from '@modules/cities';
import { Subscription } from '@modules/subscriptions';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'refresh_token_hash', nullable: true })
  refreshTokenHash: string | null;

  @ManyToMany(() => City)
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
  cities: City[]

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[]
}
