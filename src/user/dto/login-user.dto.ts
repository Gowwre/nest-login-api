import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class LoginUserDto {
  @Field()
  email: string;
  @Field()
  password: string;
}
