import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IUser } from '../interfaces';
import { Subscription } from '@modules/subscriptions/entities/subscription.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  refreshToken: string | null;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
