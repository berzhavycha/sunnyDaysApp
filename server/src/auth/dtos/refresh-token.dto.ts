import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType('refreshTokenDto')
export class RefreshTokenDto{
    @Field(() => String)
    @IsNotEmpty()
    refreshToken: string
}