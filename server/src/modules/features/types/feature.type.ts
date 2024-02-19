import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FeaturePayload {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name!: string;

    @Field(() => Boolean)
    isActive!: boolean;
}