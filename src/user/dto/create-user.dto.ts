import { Field, InputType } from "@nestjs/graphql";

@InputType()
class CreateUserDto {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  confirmPassword: string;
}

export default CreateUserDto;
