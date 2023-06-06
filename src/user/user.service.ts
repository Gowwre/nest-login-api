/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  CreateUserParams,
  LoginUserParams,
  UpdateUserParams,
} from 'src/util/types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  login(loginUserDetails: LoginUserParams) {
    return this.userRepository.findOne({
      where: {
        email: loginUserDetails.email,
        password: loginUserDetails.password,
      },
    });
  }
  delete(id: number) {
    return this.userRepository.delete(id);
  }
  update(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update(id, { ...updateUserDetails });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email: email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
}
