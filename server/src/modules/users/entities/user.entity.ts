import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IUser } from '../interfaces';

@ObjectType('User')
@Entity({ name: 'users' })
export class User implements IUser {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  passwordHash: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  refreshToken: string | null;
}
