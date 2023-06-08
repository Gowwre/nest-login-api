/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async signInThatReturnsAUserObject(
    email: string,
    passwordInput: string,
  ): Promise<any> {
    try {
      const user = await this.userService.findOne(email);
      if (user?.password !== passwordInput) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      console.log(error.message);
    }
  }
  async signIn(email: string, passwordInput: string): Promise<any> {
    try {
      const user = await this.userService.findOne(email);
      if (user?.password !== passwordInput) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: user.userId,
        email: user.email,
        name: user.username,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error.message);
    }
  }
}
