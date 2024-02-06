import { Entity, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users';
import { City } from '@modules/cities/entities';

@ObjectType()
@Entity({ name: 'subscriptions' })
export class Subscription {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Field(() => String)
  @PrimaryColumn({ name: 'city_id' })
  cityId: string;

  @ManyToOne(() => User, (user) => user.cities)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => City)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  cities: City[];
}
