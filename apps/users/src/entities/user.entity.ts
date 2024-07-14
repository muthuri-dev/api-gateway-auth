import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Avatar {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  user_id: string;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Avatar, { nullable: true })
  avatar?: Avatar | null;

  @Field()
  role: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
