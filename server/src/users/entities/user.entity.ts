import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IUser } from '@users/interfaces/user.interface';

@ObjectType('User')
@Entity({ name: 'users' })
export class User implements IUser {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  passwordHash: string;
}
