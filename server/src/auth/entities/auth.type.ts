import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@users/entities/user.entity';
import { IUser } from '@users/interfaces/user.interface';

@ObjectType('Auth')
export abstract class AuthType {
    @Field(() => String)
    public accessToken: string;

    @Field(() => String)
    public refreshToken: string;
}