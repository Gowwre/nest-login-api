/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import LoginUserDto from './dto/login-user.dto';

@Controller('/user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}
  @Get()
  async getUsers() {
    const allUsers = await this.userService.findAll();
    return allUsers;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    await this.userService.createUser(userDetails);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const loggedInUser = await this.userService.login(loginUserDto);
    return loggedInUser;
  }
}
