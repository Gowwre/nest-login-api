import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { DeleteResult } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('email') email: string) {
    return await this.userService.findOne(email);
  }

  @Query(() => [User])
  async users() {
    const allUsers = await this.userService.findAll();
    return allUsers;
  }

  @Mutation(()=>User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    const {confirmPassword,...userDetails} = createUserDto;
    return await this.userService.createUser(userDetails);  
  }

  @Mutation(()=>String)
  async deleteUser(@Args('id') id: number) {
    const result= await this.userService.delete(id);
    if(result.affected){
      return "Delete Success";
    }
  }
}
