import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
  refreshToken: string | null;
}
